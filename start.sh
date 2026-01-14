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

    # Detect distribution
    if command_exists apt; then
        echo "Detected Debian/Ubuntu. Installing Node.js v20..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command_exists pacman; then
        echo "Detected Arch Linux. Installing Node.js v20..."
        sudo pacman -S --noconfirm nodejs npm
    elif command_exists dnf; then
        echo "Detected Fedora/RHEL. Installing Node.js v20..."
        curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
        sudo dnf install -y nodejs
    elif command_exists zypper; then
        echo "Detected openSUSE. Installing Node.js v20..."
        sudo zypper install -y nodejs20
    else
        echo "Unsupported distribution. Please install Node.js v20 manually."
        echo "Visit: https://nodejs.org"
        exit 1
    fi

    echo "Node.js installation completed."
else
    # Check version
    NODE_VERSION=$(get_node_version)
    echo "Node.js version: v$NODE_VERSION"

    if [ "$NODE_VERSION" -lt 20 ]; then
        echo "Node.js version is below v20. Upgrading to Node.js v20..."

        # Detect distribution and upgrade
        if command_exists apt; then
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command_exists pacman; then
            sudo pacman -S --noconfirm nodejs npm
        elif command_exists dnf; then
            curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
            sudo dnf install -y nodejs
        elif command_exists zypper; then
            sudo zypper install -y nodejs20
        else
            echo "Unsupported distribution. Please upgrade Node.js to v20 manually."
            echo "Visit: https://nodejs.org"
            exit 1
        fi

        echo "Node.js upgrade completed."
    else
        echo "Node.js v20+ is already installed."
    fi
fi

echo "Verifying Node.js installation..."
if ! node --version >/dev/null 2>&1; then
    echo "Node.js verification failed. Please restart your terminal and try again."
    exit 1
fi

FINAL_VERSION=$(get_node_version)
if [ "$FINAL_VERSION" -lt 20 ]; then
    echo "Node.js version is still below v20. Please restart your terminal and try again."
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