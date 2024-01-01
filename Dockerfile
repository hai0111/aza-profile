FROM node:20.10.0

WORKDIR /app

COPY ./ /app

# RUN npm i && npm run build && pm2 start npm -- start
RUN npm i && npm run build 

EXPOSE 3000

CMD ["npm", "start"]