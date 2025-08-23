FROM node:20 
#copy image in node:20

WORKDIR /app
#cd to /app inside the container

COPY package*.json ./
#copy package.json to "./" which is the current dir

RUN npm install
#run npm install

COPY . .
#copy all of our code to the dir

ENV PORT=8080
#set the env var of port to 8080

EXPOSE 8080
#expose the 8080 port

CMD [ "npm", "run", "dev" ]


