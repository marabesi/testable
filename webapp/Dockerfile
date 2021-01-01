FROM node:14-slim

ARG REACT_APP_SURVEY_URL=https://form.jotformeu.com/92007220751345?id={id}
ARG REACT_APP_FIREBASE_JSON='{}'
ARG REACT_APP_RANKING_API='http://localhost'
ARG REACT_APP_SHOW_SURVEY=false

WORKDIR /var/www/app

COPY package*.json ./

COPY . .

RUN npm install && npm run build

EXPOSE 5000

CMD npm run serve