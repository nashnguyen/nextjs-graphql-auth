FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
RUN yarn prisma generate --schema=./src/prisma/schema.prisma
RUN yarn build
CMD yarn prisma migrate deploy --schema=./src/prisma/schema.prisma && yarn dev
