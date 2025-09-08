# Use official Node.js 18 image
FROM node:18-bullseye

# Install Python, pip, and Git (so user can run pkg/python commands later)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package.json files first (better caching)
COPY package*.json ./

# Install dependencies (omit dev for production, no lockfile needed)
RUN npm install --omit=dev

# Copy app source
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
