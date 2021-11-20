FROM node:14

WORKDIR /app

COPY ./package.json ./

RUN npm isntall

COPY . .

CMD [ "npm", "run", "start" ]