#!/bin/bash

set -e

echo "Checking Node.js installation..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get Node.js version
get_node_version() {
    node --version 2>/dev/null | sed 's/v//' | cut -d'.' -f1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "Node.js not found. Installing Node.js..."

    echo "Updating packages..."
    pkg update -y

    echo "Installing Node.js..."
    pkg install nodejs -y

    echo "Node.js installation completed."
else
    # Check version
    NODE_VERSION=$(get_node_version)
    echo "Node.js version: v$NODE_VERSION"

    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "Node.js version is below v18. Upgrading to latest Node.js..."

        echo "Updating packages..."
        pkg update -y

        echo "Installing latest Node.js..."
        pkg install nodejs -y

        echo "Node.js upgrade completed."
    else
        echo "Node.js v18+ is already installed."
    fi
fi

echo "Verifying Node.js installation..."
if ! node --version >/dev/null 2>&1; then
    echo "Node.js verification failed. Please restart Termux and try again."
    exit 1
fi

FINAL_VERSION=$(get_node_version)
if [ "$FINAL_VERSION" -lt 18 ]; then
    echo "Node.js version is still below v18. Please restart Termux and try again."
    exit 1
fi

echo "Node.js verification successful."
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies."
    exit 1
fi

echo "Starting the application..."
npm start