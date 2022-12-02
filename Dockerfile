FROM node:16.18.0
WORKDIR /usr/src/app
COPY . .
RUN npm i
ENV NODE_ENV=production
CMD ["npm", "start"]

