FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
CMD yarn dev