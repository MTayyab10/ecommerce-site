# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy all application files to the container
COPY . .

# Build the React application (adjust this based on your project's build process)
RUN npm run build

# Expose port 3000 (adjust this to match your application's port)
EXPOSE 3000

# Define the command to run the application (e.g., React development server)
CMD ["npm", "start"]
