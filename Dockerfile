FROM debian:bullseye

# Install Node.js, npm, Python, pip, git
RUN apt-get update && apt-get install -y \
  nodejs \
  npm \
  python3 \
  python3-pip \
  git \
  curl \
  wget \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Create workspace
RUN mkdir -p /workspace

# Backend
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000
CMD ["npm", "start"]
