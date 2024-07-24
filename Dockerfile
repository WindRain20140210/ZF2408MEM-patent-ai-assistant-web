
FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn

# copy all files
COPY . .

# slow speed. deploy OK ...
CMD ["yarn", "dev", "--debug"]

# prot = 9050 !!!

EXPOSE 9051