# Use official Node.js image with Debian
FROM node:18-bullseye

# Install Python, pip, git (for repo cloning + Python support)
RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  git \
  && rm -rf /var/lib/apt/lists/*

# Create workspace for user projects
RUN mkdir -p /workspace

# Set working directory for backend
WORKDIR /usr/src/app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies (faster, reliable, skips dev deps in prod)
RUN npm ci --only=production

# Copy app source (doesn’t break cached layers if deps unchanged)
COPY . .

# Expose API port
EXPOSE 4000

# Run server
CMD ["npm", "start"]
