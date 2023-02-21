FROM node:alpine

WORKDIR /app/user_management

# COPY ["package.json", "package-lock.json*", "./"]
#COPY .npmrc ./
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 7001

CMD [ "npm", "start" ]
