# Using official node runtime base image
FROM node:14-alpine

# Set the application directory
WORKDIR /api

# Copy package.json
COPY package.json package.json

# Install dependancies
RUN npm i

# Copy nodemon.json
COPY nodemon.json nodemon.json

# Copy our code from the current folder to /app inside the container
COPY src src

# Define our command to be run when launching the container
CMD ["npm", "run", "dev"]