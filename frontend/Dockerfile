# Use the official Node.js image from the Docker Hub
FROM node:14

# Set work directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]