FROM node:12.18.1-alpine

WORKDIR /usr/src/app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .

CMD npm start



# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .

# CMD npm start

