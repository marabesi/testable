[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b22163ba0ed9450d89d6e7b2ef71b886)](https://app.codacy.com/app/matheus-marabesi/testable?utm_source=github.com&utm_medium=referral&utm_content=marabesi/testable&utm_campaign=Badge_Grade_Settings)
[![Build Status](https://travis-ci.org/marabesi/testable.svg?branch=master)](https://travis-ci.org/marabesi/testable)
[![Coverage Status](https://coveralls.io/repos/github/marabesi/testable/badge.svg?branch=master)](https://coveralls.io/github/marabesi/testable?branch=master)

## Testable - gamified tool to improve unit testing teaching

![Testable palette](concept.jpg "Testable palette")

## Installation

Testable uses firebase to manage users and its data, which makes a firebase
account a requirement to get the project up and running.

The recommended approach to use the application is through docker and docker-compose.
Variables are configured using a `.env` in the root folder of the project.

The most basic `.env` file is as follows:

```
# exposes the webapp and ranking api in the following ports:
RANKING_PORT=4000
TESTABLE_PORT=3000

# variables used on the webapp only
REACT_APP_FIREBASE_JSON={}
REACT_APP_RANKING_API=http://localhost:4000
REACT_APP_DEBUG=false
REACT_APP_SHOW_SURVEY=false
REACT_APP_SURVEY_URL=http://my_forma_to_be_used.com

# variables used on the ranking api only
RANKING_FIREBASE_JSON={}
FIREBASE_DATABASE_URL=https://my_database.firebaseio.com
CORS_ORIGINS=localhost:3000,localhost:4000
```

The following table gives more details about each one of them.

|Variable|Required|Description|
|--------|--------|-----------|
|RANKING_PORT|true||
|TESTABLE_PORT|true||
|REACT_APP_FIREBASE_JSON|true||
|REACT_APP_RANKING_API|true||
|REACT_APP_DEBUG|false||
|REACT_APP_SHOW_SURVEY|false||
|REACT_APP_SURVEY_URL|false||
|RANKING_FIREBASE_JSON|true||
|FIREBASE_DATABASE_URL|true||
|CORS_ORIGINS|false||