# Use the official Node.js runtime as the base image
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Use nginx to serve the built application
FROM nginx:alpine

# Copy the built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration (we'll create this next)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]