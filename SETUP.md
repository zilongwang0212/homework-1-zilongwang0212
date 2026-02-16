# Setup and Deployment Guide

## Quick Start

### 1. GitHub Pages Setup

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2-3 minutes for deployment
7. Your site will be available at: `https://[username].github.io/[repo-name]/`

### 2. Enable GitHub Actions

The workflow should work automatically, but verify:

1. Go to **Settings** → **Actions** → **General**
2. Ensure **Read and write permissions** is selected under **Workflow permissions**
3. This allows the bot to commit papers.json updates

### 3. Test the Setup

#### Test Locally
```bash
# Open the website locally
open index.html

# Or use Python HTTP server
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

#### Test Papers Fetching
```bash
# Install dependencies (if not already)
pip3 install requests

# Run the fetch script
python3 fetch_papers.py

# Verify papers.json was created/updated
cat papers.json
```

#### Test GitHub Action Manually
1. Go to **Actions** tab in your repository
2. Click on **Update arXiv Papers** workflow
3. Click **Run workflow** button
4. Select branch: `main`
5. Click **Run workflow**
6. Watch the progress and check if papers.json gets updated

### 4. Verify Everything Works

- [ ] Homepage loads and looks good
- [ ] Pac-Man game is playable
- [ ] arXiv papers page shows data
- [ ] Navigation between pages works
- [ ] GitHub Action ran successfully
- [ ] papers.json exists and has valid JSON

### 5. Customize (Optional)

#### Change arXiv Categories
Edit `fetch_papers.py`:
```python
SEARCH_QUERY = "cat:cs.AI OR cat:cs.LG"  # Modify this
MAX_RESULTS = 20  # Change number of papers
```

#### Update Colors/Theme
Edit `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change gradient colors */
```

#### Modify Game Difficulty
Edit `pacman.js`:
```javascript
const POWER_UP_DURATION = 300;  // Power-up length
const ROSE_SPAWN_INTERVAL = 600;  // Rose spawn frequency
```

## Troubleshooting

### GitHub Pages not showing
- Wait 5-10 minutes after first enabling
- Check Settings → Pages for deployment status
- Ensure files are in root directory (not in subfolder)
- Try clearing browser cache

### GitHub Action fails
- Check Actions tab for error messages
- Verify permissions are set correctly
- Ensure Python syntax is correct in fetch_papers.py
- Check if arXiv API is accessible

### Papers not loading
- Check browser console for errors (F12)
- Verify papers.json exists and is valid JSON
- Ensure arxiv.js is loaded properly
- Try running fetch_papers.py manually first

### Game not working
- Check browser console for errors
- Verify pacman.js is loaded
- Try different browsers (Chrome, Firefox, Safari)
- Ensure JavaScript is enabled

## File Structure Reference

```
homework-1-zilongwang0212/
├── .github/
│   └── workflows/
│       └── update-papers.yml    # Auto-update workflow
├── index.html                    # Homepage
├── styles.css                    # Global styles
├── pacman.html                   # Game page
├── pacman.js                     # Game logic
├── arxiv.html                    # Papers page
├── arxiv.js                      # Papers display logic
├── fetch_papers.py               # Paper fetching script
├── papers.json                   # Paper data (auto-generated)
├── README.md                     # Main documentation
└── SETUP.md                      # This file
```

## Next Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Complete homework assignment"
   git push origin main
   ```

2. **Update README with your GitHub Pages URL**

3. **Test all features on the live site**

4. **Submit assignment with repository link**

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [arXiv API User Manual](https://arxiv.org/help/api/user-manual)
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review error messages carefully
3. Search for similar issues on Stack Overflow
4. Use GitHub Copilot or ChatGPT for debugging help
5. Check the course forum or contact TA

Good luck! 🚀
