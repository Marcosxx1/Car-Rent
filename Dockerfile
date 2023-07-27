FROM node

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./


RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]