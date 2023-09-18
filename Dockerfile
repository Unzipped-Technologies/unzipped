# Use the official Node.js image
FROM node:16.10.0

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy local code to the container
COPY . .

EXPOSE 3000

# Start the app
CMD ["npm", "start"]
