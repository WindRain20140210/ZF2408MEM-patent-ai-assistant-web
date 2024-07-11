
FROM node

WORKDIR /app

COPY package.json .

RUN yarn

# copy all files
COPY . .

# slow speed. deploy OK ...
CMD ["yarn", "dev", "--debug"]

EXPOSE 9050