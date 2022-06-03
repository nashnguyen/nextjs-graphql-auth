FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install
RUN yarn prisma generate --schema=./src/prisma/schema.prisma
RUN yarn build
CMD ["yarn", "dev"]
