[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6df65172ce484aec85691c7f0e354d9a)](https://www.codacy.com/gh/marabesi/testable/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marabesi/testable&amp;utm_campaign=Badge_Grade)
[![Node CI](https://github.com/marabesi/testable/actions/workflows/pipeline.yml/badge.svg)](https://github.com/marabesi/testable/actions/workflows/pipeline.yml)
[![Coverage Status](https://coveralls.io/repos/github/marabesi/testable/badge.svg?branch=master)](https://coveralls.io/github/marabesi/testable?branch=master)

## Testable - gamified tool to improve unit testing teaching

Testable is a gamified tool that offers a javascript based challenges aimed to
teach unit testing.

![Testable intro](concept.gif "Testable")

## Code base visualization

This is a visualization built using [this project](https://github.com/githubocto/repo-visualizer-demo), it
helps us to understand how the code base and gives a hint on where the
complex part is.

![Visualization of this repo, based on https://github.com/githubocto/repo-visualizer-demo](./diagram.svg)

## Table of contents

1. [Project structure](#1-project-structure)
2. [Installation](#2-installation)
3. [Firebase](#3-firebase)
4. [Components documentation (styleguidist)](https://testable.netlify.app/docs)

## 1. Project structure

This repository host the testable web app and the ranking api. Both are
in the same repository for convinience and for a simpler approach
for local development with docker.

```
|_
  |_ docker        -> files used to configure change docker configuration
  |_ webapp        -> the front end app is in this folder
  |_ ranking-api   -> the ranking api is here
  |_ .env          -> this file is used to manage env variables for both projects
```

The front end app is built using the following libraries:

1. React (with typescript)
2. Redux
3. Code mirror
4. React router
5. React Intl
6. Introjs / introjs React wrapper
7. Firebase and Firebase UI

The ranking api is a node js + express application and uses the following libraries:

1. dotenv
2. express
3. firebase-admin

Each folder has its own readme file with more detail about the project it self.

- [webapp readme](webapp/README.md)
- [ranking api readme](ranking-api/README.md)

## 2. Installation

Testable uses firebase to manage users and its data, which makes a firebase
account a requirement to get the project up and running. The webapp
requires the firebase JSON from the firebase console, and the ranking
api requires the firebase json generated by the google account.

The recommended approach to use the application is through docker and docker-compose.
Variables are configured using a `.env` in the root folder of the project.

The most basic `.env` file is as follows:

```
# exposes the webapp and ranking api in the following ports:
RANKING_PORT=4000
TESTABLE_PORT=3000

# variables used on the webapp only
REACT_APP_FIREBASE_JSON={"apiKey":"","authDomain":"","databaseURL":"","projectId":"","storageBucket":"","messagingSenderId":"","appId":""}
REACT_APP_RANKING_API=http://localhost:4000
REACT_APP_DEBUG=false
REACT_APP_SHOW_SURVEY=false
REACT_APP_SURVEY_URL=http://my_form_to_be_used.com
REACT_APP_BASE_NAME=/

# variables used on the ranking api only
RANKING_FIREBASE_JSON={"type": "service_account", "project_id": "", "private_key_id": "", "private_key": "", "client_email": "", "client_id": "", "auth_uri": "", "token_uri": "", "auth_provider_x509_cert_url": "", "client_x509_cert_url": ""}
FIREBASE_DATABASE_URL=https://my_database.firebaseio.com
CORS_ORIGINS=localhost:3000,localhost:4000
```

The following table gives more details about each one of them. For each
of the variables, if more detail is needed a link is provided.

|Variable|Required|Description|
|--------|--------|-----------|
|RANKING_PORT|true|this is the port in which you want to expose the ranking api|
|TESTABLE_PORT|true|this is the port in which you want to expose the front end / web app|
|REACT_APP_FIREBASE_JSON|true|Plain JSON provided by the Firebase console|
|REACT_APP_RANKING_API|true|The URL from the ranking API. For example, if the `RANKING_PORT` is 4000, this value would be `http://ranking:4000` - `ranking:4000` comes from the docker network.|
|REACT_APP_DEBUG|false|The debug mode in the interface allows a fast travel in time and debug messages through the dev tool. This value should be used in local/development mode only|
|REACT_APP_SHOW_SURVEY|false|Variables that controls if the survey button show be shown.|
|REACT_APP_SURVEY_URL|false|If `REACT_APP_SHOW_SURVEY` is set to true, then this URL is displayed for the user to fill in the survey.|
|PUBLIC_URL|false|This is the full URL where the frontend is running, for exemple: `https://app-testable.herokuapp.com`|
|REACT_APP_BASE_NAME|false|this variable is used most for deployment purposes. It configures the build step to use a different base name than `/`. This is useful for deployments under sub directories in the domain, for example: `https://mydomain.org/app`.|
|RANKING_FIREBASE_JSON|true|Plain json provided by the Firebase services account|
|FIREBASE_DATABASE_URL|true|This value is provided by the firebase console JSON, and the value is under the key `databaseURL`. Both values should match, to prevent authentication issues.|
|CORS_ORIGINS|false|This is the variable that controls the CORS in the ranking API. The value should be the domain name and the port if needed. Valid values are: `localhost` or `localhost:3000`. Multiple values are accepted and they must be split by comma, such as: `mydomain1.com,mydomain2.com,localhost:3000,localhost` |

Once the `.env` file is in place and has the described variables/values,
the docker services are ready to run.

### 2.1 Development mode

This project comes with two docker compose files, one for development and another
one for deployment. For development the suggested approach is to run:

```
docker-compose -f docker-compose-dev.yml up
```

This will spin up four services three services, names:

1. The web app (front end)
2. the web app documentation
3. The ranking api

Those are reloaded once the source code is changed. Perfect for development.

### 2.2 Testing installation (development mode)

The project provides a test command to check the installation:

```
docker-compose -f docker-compose-dev.yml run --rm testable npm run coverage -- --watchAll=false
```

### 2.3 Deployment mode

The other option is the deployment mode, which uses the default file `docker-compose.yml`.
There are two differences for this mode. The first one is that it runs without
auto reloading once the source code is changed and the other one is that
the documentation is built in the web app disribution rather than having its own service.

```
docker-compose up
```

## 3. Firebase

As previously mentioned this project uses firebase for managing users and
everything related to authentication. This hard dependency makes a must,
the firebase account. This project uses both JSON generated by Firebase,
the one via [firebase console](https://console.firebase.google.com) and
the one generated by [the services account](https://firebase.google.com/docs/admin/setup).