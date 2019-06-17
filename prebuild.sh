#!/bin/bash

echo "BUMP HELLO WORLD set up $GH_REPO [via travis] for $GIT_NAME <${GIT_EMAIL}>"
export REPO_URL="https://$GH_TOKEN@github.com/$GH_REPO.git"
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
git branch -a
echo "STATUS"
git status
git remote rename origin old
echo "remotes pre pre-authorized remote url"
git remote -v
git remote add origin $REPO_URL
git config remote.origin.url $REPO_URL

echo $FIREBASE >> src/env.prod.json

echo "{
  \"host\": \"$CYPRESS_HOST\",
  \"email\": \"$CYPRESS_EMAIL\",
  \"password\": \"$CYPRESS_PASSWORD\"
}" >> cypress.env.json

echo "DEBUG, cd out"
test -d out && (
  cd out
  echo -n "user.email"
  git config user.email
  echo -n "user.name"
  git config user.name

) || echo "fresh build, no out directory"