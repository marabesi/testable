#!/bin/bash

currentver="$(node -v)"
requiredver="9.0.0"

set -ev
remote_repo=${REPO_URL:-`git config remote.origin.url`}
remote_branch="gh-pages"

if [ "$(printf '%s\n' "$requiredver" "$currentver" | sort -V | head -n1)" = "$requiredver" ]; then 
  rm -fr .git && \
  git init && \
  git config user.name "$GIT_NAME" && \
  git config user.email "$GIT_EMAIL" && \
  git add -f build && \
  git add -f coverage && \
  git add -f cypress && \
  git commit -m 'build' && \
  git push --force $remote_repo master:$remote_branch && \
  rm -fr .git
fi