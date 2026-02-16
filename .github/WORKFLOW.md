# GitHub Automation Configuration

This directory contains all agent configurations and workflow files for automating the arXiv paper feed update system.

## 📁 Directory Structure

```
.github/
├── README.md                      # This file - explains all configurations
└── workflows/
    └── update-papers.yml         # Main automation workflow
```

## 🤖 Agent Architecture

This project uses an **agentic programming paradigm** where specialized agents work autonomously to maintain the paper feed:

### Agent 1: Data Fetcher Agent
- **File:** `fetch_papers.py` (root directory)
- **Purpose:** Fetches latest research papers from arXiv API
- **Trigger:** Executed by GitHub Actions workflow
- **Input:** None (uses hardcoded search query)
- **Output:** `papers.json` with structured paper data
- **Technology:** Python 3.11, requests library, XML parsing

### Agent 2: Workflow Orchestrator Agent
- **File:** `.github/workflows/update-papers.yml`
- **Purpose:** Schedules and coordinates the entire update process
- **Trigger:** Daily at midnight UTC (cron) or manual dispatch
- **Responsibilities:**
  * Set up Python environment
  * Execute Data Fetcher Agent
  * Commit changes to repository
  * Push updates to GitHub
- **Technology:** GitHub Actions, Ubuntu runner

### Agent 3: Display Agent
- **Files:** `arxiv.html`, `arxiv.js` (root directory)
- **Purpose:** Renders papers to users with search/filter capabilities
- **Trigger:** User visits the webpage
- **Input:** Loads `papers.json`
- **Output:** Interactive HTML display
- **Technology:** JavaScript ES6+, Fetch API

### Agent 4: Storage Agent
- **File:** `papers.json` (root directory, auto-generated)
- **Purpose:** Persistent data store for paper information
- **Format:** JSON with metadata and paper array
- **Update Frequency:** Daily via Workflow Orchestrator

---

## 📄 Workflow File: `update-papers.yml`

### Overview
This GitHub Actions workflow automates the daily update of arXiv papers without requiring manual intervention or a backend server.

### Configuration Details

#### Triggers
```yaml
on:
  schedule:
    - cron: '0 0 * * *'    # Runs daily at 00:00 UTC
  workflow_dispatch:        # Allows manual triggering from Actions tab
```

**Cron Schedule:**
- `0 0 * * *` = Every day at midnight UTC
- Equivalent to 24-hour intervals
- Can be adjusted by modifying the cron expression

**Manual Trigger:**
- Navigate to: `Actions` tab → `Update arXiv Papers` → `Run workflow`
- Useful for testing or immediate updates
- No parameters required

#### Job Configuration

**Runner Environment:**
```yaml
runs-on: ubuntu-latest
```
- Uses GitHub-hosted Ubuntu runner
- Fresh environment for each run
- No cost for public repositories

**Permissions:**
```yaml
permissions:
  contents: write
```
- Required for the workflow to commit and push changes
- Without this, workflow would fail with "permission denied"
- Grants write access to repository contents only

#### Workflow Steps

**Step 1: Checkout Repository**
```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```
- Clones the repository to the runner
- Version `@v4` is the latest stable release
- Includes full git history

**Step 2: Set Up Python**
```yaml
- name: Set up Python
  uses: actions/setup-python@v5
  with:
    python-version: '3.11'
```
- Installs Python 3.11 on the runner
- Version 3.11 chosen for compatibility and performance
- Includes pip package manager

**Step 3: Install Dependencies**
```yaml
- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install requests
```
- Upgrades pip to latest version
- Installs `requests` library for HTTP calls
- Additional dependencies can be added here

**Step 4: Fetch arXiv Papers**
```yaml
- name: Fetch arXiv papers
  run: python fetch_papers.py
```
- Executes the Data Fetcher Agent
- Runs in the repository root directory
- Creates/updates `papers.json`
- Errors will fail the workflow and send notifications

**Step 5: Commit and Push Changes**
```yaml
- name: Commit and push if changed
  run: |
    git config --local user.email "github-actions[bot]@users.noreply.github.com"
    git config --local user.name "github-actions[bot]"
    git add papers.json
    git diff --quiet && git diff --staged --quiet || \
    (git commit -m "Auto-update arXiv papers - $(date +'%Y-%m-%d %H:%M:%S')" && git push)
```

**Breakdown:**
1. **Configure Git User:**
   - Email: `github-actions[bot]@users.noreply.github.com`
   - Name: `github-actions[bot]`
   - These are recognized GitHub bot credentials

2. **Stage Changes:**
   - `git add papers.json` - Adds only the papers file
   - Ignores other potential changes

3. **Conditional Commit:**
   - `git diff --quiet && git diff --staged --quiet` - Checks if there are changes
   - `||` - If changes exist (command fails), run next part
   - Commits with timestamp in message
   - Pushes to the default branch (main)

4. **Prevents Empty Commits:**
   - Only commits when `papers.json` actually changed
   - Avoids polluting commit history

---

## 🔧 How to Use This Workflow

### Automatic Operation
Once set up, the workflow runs automatically every day at midnight UTC. No manual intervention required.

### Manual Trigger
1. Go to your repository on GitHub
2. Click the `Actions` tab
3. Select `Update arXiv Papers` workflow
4. Click `Run workflow` button
5. Select branch (usually `main`)
6. Click green `Run workflow` button

### Monitoring
- View workflow runs in the `Actions` tab
- Green checkmark = Success
- Red X = Failure (click to see logs)
- Yellow circle = In progress

### Troubleshooting

**Common Issues:**

1. **Permission Denied Error**
   - **Cause:** Missing `contents: write` permission
   - **Fix:** Ensure `permissions` block is in workflow file

2. **Python Script Fails**
   - **Cause:** API error, network issue, or bug in `fetch_papers.py`
   - **Fix:** Check logs in Actions tab, test script locally

3. **No Commits Being Made**
   - **Cause:** `papers.json` hasn't changed (expected behavior)
   - **Fix:** This is normal if no new papers match criteria

4. **Workflow Not Running on Schedule**
   - **Cause:** Repository might be inactive or cron disabled
   - **Fix:** Make a commit to activate, or trigger manually

---

## 🔐 Security Considerations

### Secrets
This workflow does **not** use any secrets:
- arXiv API is public and requires no authentication
- GitHub token is automatically provided by Actions
- No API keys or credentials needed

### Permissions
- Workflow has **write** access to repository contents
- This is necessary for committing `papers.json`
- Scope is limited to this repository only
- Cannot access other repositories or user data

### Dependencies
- Only uses official GitHub Actions (`actions/checkout`, `actions/setup-python`)
- Only installs `requests` library (well-maintained, widely used)
- No third-party or unverified actions

---

## 📊 Workflow Metrics

**Typical Run Time:** 30-60 seconds
- Checkout: ~5s
- Python setup: ~10s
- Dependency install: ~5s
- Fetch papers: ~10-20s
- Commit & push: ~5-10s

**Cost:** Free
- Public repositories get unlimited Actions minutes
- Private repositories: 2,000 minutes/month free

**Data Usage:**
- Fetches ~20 papers per run
- API response: ~50-100 KB
- Commit size: ~20-50 KB
- Total: Minimal bandwidth usage

---

## 🧪 Testing

### Local Testing
Before pushing workflow changes, test locally:

```bash
# Test the Python script
python3 fetch_papers.py

# Verify output
cat papers.json

# Test the workflow commands manually
python -m pip install --upgrade pip
pip install requests
python fetch_papers.py
git status  # Check if papers.json changed
```

### Workflow Testing
1. Make a small change to `update-papers.yml`
2. Commit and push to GitHub
3. Manually trigger the workflow
4. Check logs for any errors
5. Verify `papers.json` was updated

---

## 📝 Modification Guide

### Change Update Frequency

**Daily at different time:**
```yaml
- cron: '0 12 * * *'  # Noon UTC instead of midnight
```

**Twice daily:**
```yaml
on:
  schedule:
    - cron: '0 0 * * *'   # Midnight
    - cron: '0 12 * * *'  # Noon
```

**Weekly (Sundays only):**
```yaml
- cron: '0 0 * * 0'  # Every Sunday at midnight
```

### Fetch More Papers

Edit `fetch_papers.py`:
```python
MAX_RESULTS = 50  # Change from 20 to 50
```

### Change Paper Categories

Edit `fetch_papers.py`:
```python
SEARCH_QUERY = "cat:cs.AI OR cat:cs.CV"  # Only AI and Vision
```

### Add Notifications

Add to workflow (requires setup):
```yaml
- name: Notify on failure
  if: failure()
  run: |
    # Add notification logic here
    echo "Workflow failed!"
```

---

## 🏗️ Architecture Decisions

### Why GitHub Actions?
- ✅ Serverless - No server maintenance
- ✅ Free for public repos
- ✅ Integrated with GitHub
- ✅ Built-in cron scheduling
- ✅ Reliable infrastructure

### Why JSON Storage?
- ✅ Static hosting compatible (GitHub Pages)
- ✅ Easy to parse in JavaScript
- ✅ Human-readable
- ✅ Version controlled
- ✅ No database needed

### Why Daily Updates?
- ✅ arXiv posts papers daily
- ✅ Balances freshness with API load
- ✅ Doesn't exceed rate limits
- ✅ Sufficient for research paper tracking

### Why Python for Fetcher?
- ✅ Excellent XML parsing libraries
- ✅ `requests` library is robust
- ✅ Easy to maintain
- ✅ GitHub Actions has native Python support

---

## 📚 Related Files

### In Root Directory:
- **`fetch_papers.py`** - Data fetcher agent implementation
- **`papers.json`** - Generated paper data (auto-updated)
- **`arxiv.html`** - Frontend display page
- **`arxiv.js`** - Frontend logic and filtering

### Documentation:
- **`README.md`** (root) - Complete project documentation
- **`.github/README.md`** (this file) - Workflow-specific docs

---

## 🎓 Learning Resources

**GitHub Actions:**
- [Official Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Cron Schedule Generator](https://crontab.guru/)

**arXiv API:**
- [API User Manual](https://arxiv.org/help/api/user-manual)
- [API Examples](https://arxiv.org/help/api/examples)

**Python XML Parsing:**
- [ElementTree Documentation](https://docs.python.org/3/library/xml.etree.elementtree.html)
- [Requests Library](https://docs.python-requests.org/)

---

## ✅ Completion Checklist

- [x] Workflow file created (`.github/workflows/update-papers.yml`)
- [x] Cron schedule configured (daily at midnight UTC)
- [x] Manual trigger enabled (`workflow_dispatch`)
- [x] Permissions set correctly (`contents: write`)
- [x] Python environment configured (3.11)
- [x] Dependencies specified (`requests`)
- [x] Conditional commit logic implemented
- [x] Bot credentials configured
- [x] Workflow tested and verified working
- [x] Documentation completed (this file)

---

## 📧 Support

For issues with this workflow:
1. Check the `Actions` tab for error logs
2. Review this README for common issues
3. Test the Python script locally
4. Verify GitHub Actions permissions in repository settings

---

**Last Updated:** February 16, 2026  
**Created by:** Zilong Wang  
**Course:** BST 236 - Homework 1  
**AI Tools Used:** GitHub Copilot, Copilot Chat
