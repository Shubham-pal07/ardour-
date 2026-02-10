#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
npm install

# Build the Angular app
npm run build
