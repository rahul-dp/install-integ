#!/bin/bash

# Deploy script for GitHub Pages
# This script builds and deploys the Nuxt app to GitHub Pages

set -e

echo "🚀 Starting deployment to GitHub Pages..."

# Clean install
echo "🧹 Cleaning previous installations..."
rm -rf node_modules
rm -f package-lock.json
rm -f pnpm-lock.yaml

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --ignore-scripts

# Generate static files
echo "🏗️  Building static files..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run generate

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment completed successfully!"
echo "📍 Your site will be available at: https://rahulkumar.github.io/install-integ/"
