#!/bin/bash

function consoleError() {
	printf "\\nERROR : %s \\n" "${1}"
}

function consoleLog() {
	printf "\\n✔ : %s \\n" "${1}"
}

if [ "$1" ]; then
  version=$1
else
  consoleError "Please provide a target version, eg. $0 1.4.2"
  exit 1 # problematic end
fi

if [ "$2" ]; then
  storePass=$2
else
  consoleError "Please provide key-store-password, eg. $0 $1 agreat_PASS"
  exit 1 # problematic end
fi

if [ "$3" ]; then
  storeAliasPass=$3
else
  consoleError "Please provide key-store-password, eg. $0 $1 $2 another_great_PASS"
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
  tns build android --bundle --key-store-path green-keystore.jks --key-store-password "$storePass" --key-store-alias green-build-key --key-store-alias-password "$storeAliasPass" --release --copy-to dist/green-app.apk
}

updateVersion
commitVersion
buildVersion

consoleLog "If everything is fine, don't forget to push commit & tag via : git push && git push --tags"