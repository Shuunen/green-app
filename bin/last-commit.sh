#!/bin/bash

function consoleError() {
  printf "\\nERROR : %s \\n" "${1}"
}

function consoleLog() {
  printf "\\n✔ : %s \\n" "${1}"
}

if [ "$1" ]; then
  target=$1
else
  consoleError "Please provide a target file, eg. $0 ./app/last-commit.js"
  exit 1 # problematic end
fi

sha=$(git rev-parse --short HEAD)

consoleLog "Found last commit sha -> $sha"

content="module.exports = '$sha'"

consoleLog "Filling $target file content with -> $content"

echo "$content" >"$target"

consoleLog "Last commit set up !"

exit 0 # successfull end
