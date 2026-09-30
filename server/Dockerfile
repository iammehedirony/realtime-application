# Base image
FROM node:20-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port (আপনার ব্যাকএন্ডের পোর্ট অনুযায়ী পরিবর্তন করুন, যেমন: 5000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
