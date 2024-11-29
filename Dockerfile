# Base image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Nuxt application
RUN npm run build

# Expose the port Nuxt listens on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start"]