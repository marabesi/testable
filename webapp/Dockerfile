FROM node:10.18

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "serve" ]