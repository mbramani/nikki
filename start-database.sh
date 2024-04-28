#!/usr/bin/env bash
# Use this script to start a Docker container for a local development MongoDB database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-mongodb.sh`

# On Linux and macOS, you can run this script directly - `./start-mongodb.sh`

DB_CONTAINER_NAME="nikki-mongodb"

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install Docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# Check if the MongoDB container is already running
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "MongoDB container '$DB_CONTAINER_NAME' is already running."
  exit 0
fi

# Check if the MongoDB container exists but is stopped
if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing MongoDB container '$DB_CONTAINER_NAME' started."
  exit 0
fi

# Load environment variables from .env
set -a
source .env

DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')

# Check if the default password is being used
if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default MongoDB password."
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set a password in the .env file and try again."
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

# Run the MongoDB container
docker run -d \
  --name $DB_CONTAINER_NAME \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD="$DB_PASSWORD" \
  -e MONGO_INITDB_DATABASE=nikki \
  -p 27017:27017 \
  mongo:latest && echo "MongoDB container '$DB_CONTAINER_NAME' was successfully created."

