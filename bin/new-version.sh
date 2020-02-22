#!/bin/bash

function consoleError() {
  printf "\\nERROR : %s \\n" "${1}"
}

function consoleLog() {
  printf "\\n✔ : %s \\n" "${1}"
}

if [ "$1" ]; then
  storePass=$1
else
  consoleError "Please provide key-store-password, eg. $0 agreat_PASS"
  exit 1 # problematic end
fi

if [ "$2" ]; then
  storeAliasPass=$2
else
  consoleError "Please provide key-store-password, eg. $0 $1 another_great_PASS"
  exit 1 # problematic end
fi

if [ "$3" ]; then
  version=$3
else
  consoleError "Please provide a target version, eg. $0 $1 $2 1.4.2"
  exit 1 # problematic end
fi

function updateVersion() {
  consoleLog "Upgrading files to $version"

  npm version "$version" --no-git-tag-version

  file="app/App_Resources/Android/src/main/AndroidManifest.xml"

  versionDotLess=${version//./} # remove all dots from var "version"

  consoleLog "Upgrading $file with $versionDotLess and $version"

  sed -i -e "s/versionCode=\"10[0-9]\+\"/versionCode=\"10$versionDotLess\"/" "$file"
  sed -i -e "s/versionName=\"[0-9]\.[0-9]\.[0-9]\"/versionName=\"$version\"/" "$file"
}

function commitVersion() {
  consoleLog "Creating a commit & tag for version bump"
  printf "\\n"
  git add package.json
  git add package-lock.json
  git add "$file"
  git commit -m "bump version to $version"
  if git rev-parse "v$version" >/dev/null 2>&1; then
    consoleLog "Found existing tag, removing old one..."
    git tag -d "v$version"
  fi
  git tag "v$version"
  consoleLog "Tag created : v$version"
}

function buildVersion() {
  npm run last-commit
  tns build android --release --key-store-path green-keystore.jks --key-store-password "$storePass" --key-store-alias green-build-key --key-store-alias-password "$storeAliasPass" --aab --copy-to dist/green-app.aab
}

updateVersion
commitVersion
buildVersion

echo -e "\n Check these : \n - this build went correctly ? \n - apk has been successfully uploaded & deployed on the Play Store ? \n If yes, then push commit & tag via : git push && git push --tags \n\n Else : git tag -d vXXX && git reset --hard HEAD~"
