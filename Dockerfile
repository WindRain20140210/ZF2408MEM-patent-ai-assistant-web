
FROM node

USER root

WORKDIR /app

COPY . .

RUN yarn install --development && yarn cache clean

EXPOSE 4173

CMD ["yarn", "preview"]
