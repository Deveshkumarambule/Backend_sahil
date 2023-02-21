FROM node:alpine

WORKDIR /app/login-service

# COPY ["package.json", "package-lock.json*", "./"]
#COPY .npmrc ./
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "start" ]
