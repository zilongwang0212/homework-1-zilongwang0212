# Deployment Checklist

## Before Pushing to GitHub

- [x] All HTML files created (index, pacman, arxiv)
- [x] CSS styling complete
- [x] JavaScript game logic working
- [x] Python fetch script functional
- [x] GitHub Actions workflow configured
- [x] papers.json generated with data
- [x] .gitignore configured
- [x] README.md comprehensive report complete
- [x] All documentation files created

## Local Testing

Test these before deployment:

```bash
# 1. Open homepage locally
open index.html

# 2. Test Pac-Man game
# - Arrow keys/WASD movement works
# - Dots can be collected
# - Ghosts move
# - Rose spawns and can be collected
# - Hearts shoot during power-up
# - Ghosts can be eliminated
# - Lives/score/level display correctly
# - Game over screen works
# - Restart button works

# 3. Test arXiv page
open arxiv.html
# - Papers display correctly
# - Category filter works
# - Links open properly
# - Last updated timestamp shows

# 4. Test fetch script
python3 fetch_papers.py
# - Papers fetch successfully
# - papers.json is updated
# - No errors in output
```

## Git Commands

```bash
# 1. Check status
git status

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "Complete Homework 1: Code with AI

- Problem 1: Created responsive homepage with navigation
- Problem 2: Implemented Valentine's Pac-Man game with rose power-up
- Problem 3: Built auto-updating arXiv paper feed with GitHub Actions
- All features working and documented"

# 4. Push to GitHub
git push origin main
```

## GitHub Configuration

### 1. Enable GitHub Pages

1. Go to repository Settings
2. Click "Pages" in left sidebar
3. Under "Source":
   - Branch: main
   - Folder: / (root)
4. Click Save
5. Wait 2-3 minutes
6. Note your URL: https://[username].github.io/[repo-name]/

### 2. Configure GitHub Actions

1. Go to Settings → Actions → General
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
3. Save

### 3. Test GitHub Action

1. Go to Actions tab
2. Click "Update arXiv Papers"
3. Click "Run workflow" dropdown
4. Click "Run workflow" button
5. Watch it execute
6. Check if papers.json gets updated

## Post-Deployment Testing

After GitHub Pages is live:

- [ ] Visit your GitHub Pages URL
- [ ] Homepage loads correctly
- [ ] Navigation links work
- [ ] Pac-Man game is playable
- [ ] arXiv papers display
- [ ] All styling looks good
- [ ] Mobile responsive (test on phone)
- [ ] GitHub Action runs successfully

## Update README with Live URL

Once deployed, update README.md with your actual GitHub Pages URL:

```markdown
**Homepage**: https://[yourusername].github.io/homework-1-zilongwang0212/
```

## Final Submission

- [ ] Repository pushed to GitHub
- [ ] GitHub Pages enabled and working
- [ ] GitHub Actions configured
- [ ] README has live URL
- [ ] All features tested on live site
- [ ] Submit repository link to course system

## Troubleshooting

### GitHub Pages not working
- Wait 5-10 minutes
- Check Settings → Pages for errors
- Ensure main branch is selected
- Try hard refresh (Cmd+Shift+R)

### GitHub Action fails
- Check Actions tab for error message
- Verify permissions are correct
- Check Python syntax
- Manually run fetch_papers.py locally first

### Game not working
- Check browser console (F12)
- Verify pacman.js loaded
- Try different browser
- Check for JavaScript errors

### Papers not loading
- Verify papers.json exists
- Check if file has valid JSON
- Look for fetch errors in console
- Run fetch_papers.py manually

## Success Criteria

Your homework is complete when:

✅ All three problems implemented
✅ Website hosted on GitHub Pages
✅ All pages accessible and functional
✅ GitHub Actions workflow running
✅ Comprehensive documentation
✅ Code well-organized and commented

## Estimated Timeline

- Push to GitHub: 1 minute
- GitHub Pages activation: 2-5 minutes
- First GitHub Action run: Can be triggered manually
- Total deployment time: ~10 minutes

Good luck! 🚀
