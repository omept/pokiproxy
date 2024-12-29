FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install dependencies
RUN npm install 

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
