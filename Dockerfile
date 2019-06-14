FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3311

CMD ["npm", "run", "dev"]
