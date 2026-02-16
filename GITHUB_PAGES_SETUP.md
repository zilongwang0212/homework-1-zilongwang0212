# GitHub Pages Setup Instructions

## ✅ Code Successfully Pushed to GitHub!

Your code has been committed and pushed to GitHub. Now follow these steps to enable GitHub Pages:

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub:
   ```
   https://github.com/hsph-bst236-2026/homework-1-zilongwang0212
   ```

2. Click on **Settings** (top right, gear icon)

3. In the left sidebar, scroll down and click **Pages**

4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select "main" 
   - **Folder**: Select "/ (root)"
   
5. Click **Save**

6. Wait 2-3 minutes for deployment

7. Refresh the page - you'll see:
   ```
   Your site is live at https://zilongwang0212.github.io/homework-1-zilongwang0212/
   ```

## Step 2: Enable GitHub Actions Permissions

1. While in Settings, click **Actions** → **General** (left sidebar)

2. Scroll to "Workflow permissions"

3. Select **"Read and write permissions"**

4. Check the box: **"Allow GitHub Actions to create and approve pull requests"**

5. Click **Save**

## Step 3: Verify Deployment

After 2-3 minutes, visit:
```
https://zilongwang0212.github.io/homework-1-zilongwang0212/
```

You should see your homepage!

## Step 4: Test GitHub Actions

1. Go to the **Actions** tab in your repository

2. Click on **"Update arXiv Papers"** workflow

3. Click **"Run workflow"** button (right side)

4. Select branch: **main**

5. Click **"Run workflow"**

6. Watch the green checkmark appear (takes ~30 seconds)

## Step 5: Test All Pages

Visit these URLs to verify everything works:

- **Homepage**: https://zilongwang0212.github.io/homework-1-zilongwang0212/
- **Pac-Man Game**: https://zilongwang0212.github.io/homework-1-zilongwang0212/pacman.html
- **arXiv Papers**: https://zilongwang0212.github.io/homework-1-zilongwang0212/arxiv.html

## Troubleshooting

### If GitHub Pages shows 404
- Wait 5-10 minutes (first deployment takes time)
- Check Settings → Pages for deployment status
- Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache

### If GitHub Action fails
- Check Actions tab for error message
- Verify permissions are set correctly (Step 2 above)
- Try running workflow manually again

### If game doesn't work
- Check browser console (F12) for errors
- Make sure JavaScript is enabled
- Try a different browser (Chrome/Firefox/Safari)

### If papers don't load
- Check if papers.json exists in repository
- Run fetch_papers.py locally: `python3 fetch_papers.py`
- Check browser console for fetch errors

## Next Steps

1. ✅ Code pushed to GitHub
2. ⏳ Enable GitHub Pages (follow Step 1 above)
3. ⏳ Configure Actions permissions (Step 2)
4. ⏳ Wait for deployment (~3 minutes)
5. ⏳ Test all pages (Step 5)
6. ✅ Ready to submit!

## Expected Timeline

- **Pushing code**: ✅ Done!
- **Enabling Pages**: 1 minute (manual)
- **First deployment**: 2-5 minutes (automatic)
- **Testing**: 2-3 minutes
- **Total time**: ~10 minutes

## Screenshots to Take (Optional)

For your documentation, you might want to capture:
1. GitHub Pages enabled confirmation
2. Live website homepage
3. Pac-Man game in action
4. arXiv papers page
5. GitHub Actions workflow running successfully

---

**Current Status**: Code is on GitHub, ready for deployment! 🚀

**Your repository**: https://github.com/hsph-bst236-2026/homework-1-zilongwang0212

Follow Steps 1-2 above to make your website live!
