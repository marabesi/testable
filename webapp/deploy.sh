#!/bin/bash

if [ "$TRAVIS_BRANCH" = "master" ]; then
    echo "BUMP HELLO WORLD set up $GH_REPO [via travis] for $GIT_NAME <${GIT_EMAIL}>"

    export REPO_URL="https://$GH_TOKEN@github.com/$GH_REPO.git"
    remote_repo="$REPO_URL"
    remote_branch="gh-pages"

    rm -fr .git && \
    cd build && \
    git init && \
    git config user.name "$GIT_NAME" && \
    git config user.email "$GIT_EMAIL" && \
    git add -f . && \
    git commit -m 'build' && \
    git push --force $remote_repo master:$remote_branch && \
    rm -fr .git
fi