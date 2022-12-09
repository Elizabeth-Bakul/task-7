FROM node:latest

WORKDIR /app

COPY ["index.ts",  "package.json", "tsconfig.json", ".env", "./"]

RUN npm install
RUN npm run build
CMD npm run start

EXPOSE 8080