FROM node:16.10.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "start" ]
