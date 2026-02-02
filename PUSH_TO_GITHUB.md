# Push BellSteps to GitHub - Step by Step

## Option 1: Create New GitHub Repo (Recommended)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `bellsteps`
3. Make it **Public** or **Private** (your choice)
4. **Don't** initialize with README
5. Click "Create repository"

### Step 2: Initialize Git in BellSteps Folder

Open Terminal and run:

```bash
cd "/Users/robreich-storer/Library/Mobile Documents/com~apple~CloudDocs/Bell Rewards/bellsteps"

# Remove existing git connection (if any)
rm -rf .git

# Initialize new git repo
git init

# Add all files
git add .

# Commit
git commit -m "BellSteps - Complete handbells progression app"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/bellsteps.git

# Push to GitHub
git push -u origin main
```

## Option 2: Use Existing Repo

If you want to push to your existing `eyfslessonbuilder` repo:

```bash
cd "/Users/robreich-storer/Library/Mobile Documents/com~apple~CloudDocs/Bell Rewards/bellsteps"

# Add only bellsteps files (not parent directory files)
git add app/ components/ lib/ migrations/ scripts/ package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs .gitignore README.md *.md

# Commit
git commit -m "Add BellSteps app"

# Push
git push
```

## After Pushing to GitHub

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your `bellsteps` repository
4. Deploy!

## Quick Commands (Copy & Paste)

**For new repo:**
```bash
cd "/Users/robreich-storer/Library/Mobile Documents/com~apple~CloudDocs/Bell Rewards/bellsteps"
rm -rf .git
git init
git add .
git commit -m "BellSteps - Complete app"
git remote add origin https://github.com/rrs77/bellsteps.git
git push -u origin main
```

**For existing repo:**
```bash
cd "/Users/robreich-storer/Library/Mobile Documents/com~apple~CloudDocs/Bell Rewards/bellsteps"
git add app/ components/ lib/ migrations/ scripts/ *.json *.ts *.mjs *.md .gitignore
git commit -m "Add BellSteps app"
git push
```
