#!/bin/bash
set -ev && \
cd ./build && \
remote_repo=${REPO_URL:-`git config remote.origin.url`} && \
remote_branch="gh-pages" && \
git init && \
git config user.name "marabesi" && \
git config user.email "matheus.marabesi@gmail.com" && \
git add . && \
git commit -m 'build' && \
git push --force $remote_repo master:$remote_branch && \
rm -fr .git && \
cd ../