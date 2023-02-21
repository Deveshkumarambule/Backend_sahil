FROM node:alpine

WORKDIR /app/issue-logging

# COPY ["package.json", "package-lock.json*", "./"]
#COPY .npmrc ./
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 7002 

CMD [ "npm", "start" ]
