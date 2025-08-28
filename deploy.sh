#!/bin/bash

# Deploy script for GitHub Pages
# This script builds and deploys the Nuxt app to GitHub Pages

set -e

echo "🚀 Starting deployment to GitHub Pages..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate static files
echo "🏗️  Building static files..."
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
