#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

# This script uses the parent version as the version to publish a library with

function getBuildType {
  local release_type="minor"
  if [[ "$1" == *"(major)"* ]]; then
    release_type="major"
  elif [[ "$1" == *"(patch)"* ]]; then
    release_type="patch"
  fi
  echo "$release_type"
}

PARENT_DIR="$PWD"
ROOT_DIR="."
echo "Removing Dist"
rm -rf "${ROOT_DIR:?}/dist"
COMMIT_MESSAGE="$(git log -1 --pretty=format:"%s")"
RELEASE_TYPE=${1:-$(getBuildType "$COMMIT_MESSAGE")}
DRY_RUN=${DRY_RUN:-"False"}

IGNORE=$(echo "$COMMIT_MESSAGE" | sed -nE "s/^.*\[ignore:(.+)\]$/\1/p")
if [[ "$IGNORE" != "" ]]; then
  echo "Ignoring: $IGNORE"
fi

# Version the parent library
# npm --no-git-tag-version version "$RELEASE_TYPE" -f -m "RxJS Ninja $RELEASE_TYPE"
# Get the version to set on sub-libraries
# VERSION="$(awk '/version/{gsub(/("|",)/,"",$2);print $2}' "$ROOT_DIR/package.json")"
# echo "RxJS Ninja $RELEASE_TYPE - $VERSION."

function doBuilds {
  while IFS= read -r -d $' ' lib; do
    if [[ "$IGNORE" == *"$lib"* ]]; then
      echo "Skipping $lib"
    else
      echo "Setting version for $lib"
      cd "$PARENT_DIR"
      cd "$ROOT_DIR/libs/${lib/-//}"
      npm version "$RELEASE_TYPE" -f -m "RxJS Ninja $RELEASE_TYPE"
      echo "Building $lib"
      cd "$PARENT_DIR"
      npm run build "$lib" -- --prod --with-deps
      wait
    fi
  done <<<"$1 " # leave space on end to generate correct output
}

function doPublish {
  while IFS= read -r -d $' ' lib; do
    if [[ "$DRY_RUN" == "False" || "$IGNORE" != *"$lib"* ]]; then
      echo "Publishing $lib"
      npm publish "$ROOT_DIR/dist/libs/${lib/-//}" --access=public
    else
      echo "Dry Run, not publishing $lib"
    fi
    wait
  done <<<"$1 " # leave space on end to generate correct output
}

AFFECTED=$(node node_modules/.bin/nx affected:libs --plain --base=origin/master~1)

if [[ "$AFFECTED" != "" ]]; then
  cd "$PARENT_DIR"
  echo "Copy Environment Files"

  doBuilds "$AFFECTED"
  wait
  cd "$PARENT_DIR"
  doPublish "$AFFECTED"
  wait

else
  echo "No Libraries to publish"
fi
