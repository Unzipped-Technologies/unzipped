# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy local code to the container
COPY . .

# Start the app
CMD ["npm", "start"]
