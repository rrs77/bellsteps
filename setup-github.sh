#!/bin/bash

echo "🚀 Setting up BellSteps for GitHub..."

cd "/Users/robreich-storer/Library/Mobile Documents/com~apple~CloudDocs/Bell Rewards/bellsteps"

# Check if .git exists
if [ -d .git ]; then
    echo "⚠️  Git repo already exists. Removing..."
    rm -rf .git
fi

# Initialize new git repo
echo "📦 Initializing git repository..."
git init

# Add all files
echo "➕ Adding files..."
git add .

# Commit
echo "💾 Committing files..."
git commit -m "BellSteps - Complete handbells progression app ready for Vercel"

echo ""
echo "✅ Git repository initialized!"
echo ""
echo "Next steps:"
echo "1. Create a new repo on GitHub: https://github.com/new"
echo "2. Name it 'bellsteps'"
echo "3. Then run:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/bellsteps.git"
echo "   git push -u origin main"
echo ""
echo "Or if you already created the repo, run the commands above now."
