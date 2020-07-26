#!/bin/bash

# real creds from firebase
echo $FIREBASE >> src/env.prod.json

# testing purpose
echo $FIREBASE >> src/env.json

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