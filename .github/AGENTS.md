# Agent Configuration Overview

This document provides a comprehensive overview of all agents used in the arXiv paper feed automation system.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Repository                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Orchestrator Agent                      │  │
│  │       (.github/workflows/update-papers.yml)              │  │
│  │                                                           │  │
│  │  Triggers: Cron (daily) + Manual                        │  │
│  │  Responsibilities:                                       │  │
│  │    • Schedule execution                                  │  │
│  │    • Provision environment                               │  │
│  │    • Coordinate other agents                             │  │
│  │    • Handle git operations                               │  │
│  └───────────────┬──────────────────────────────────────────┘  │
│                  │                                               │
│      ┌───────────┼───────────┐                                 │
│      │           │           │                                  │
│      ▼           ▼           ▼                                  │
│  ┌────────┐ ┌─────────┐ ┌──────────┐                          │
│  │Fetcher │ │ Storage │ │ Display  │                          │
│  │ Agent  │ │  Agent  │ │  Agent   │                          │
│  └────────┘ └─────────┘ └──────────┘                          │
│      │           │            │                                 │
│      │           │            │                                 │
│      ▼           ▼            ▼                                 │
│  ┌────────┐ ┌─────────┐ ┌──────────┐                          │
│  │fetch_  │ │papers.  │ │arxiv.html│                          │
│  │papers. │ │ json    │ │arxiv.js  │                          │
│  │py      │ │         │ │          │                          │
│  └────────┘ └─────────┘ └──────────┘                          │
└─────────────────────────────────────────────────────────────────┘
           │                    │                │
           │                    │                │
           ▼                    ▼                ▼
    ┌──────────┐          ┌─────────┐      ┌────────┐
    │arXiv API │          │Git Repo │      │Browser │
    └──────────┘          └─────────┘      └────────┘
```

## Agent Specifications

### Agent 1: Orchestrator Agent

**File:** `.github/workflows/update-papers.yml`

**Type:** Workflow Automation Agent

**Purpose:** Coordinates the entire paper update pipeline

**Configuration:**
```yaml
Trigger: Cron schedule + Manual dispatch
Runtime: GitHub Actions (Ubuntu runner)
Permissions: contents:write
Dependencies: Python 3.11, pip, requests
```

**Responsibilities:**
1. Schedule automatic execution (daily at midnight UTC)
2. Provision clean execution environment
3. Install required dependencies
4. Execute Fetcher Agent
5. Commit changes to Storage Agent
6. Push updates to remote repository
7. Clean up resources

**Input:** None (triggered by schedule or user)

**Output:** Updated repository with new papers.json

**Error Handling:**
- Logs all errors to GitHub Actions
- Sends email notification on failure
- Fails gracefully without corrupting data

**Monitoring:**
- Visible in GitHub Actions tab
- Status badges available
- Execution history retained

---

### Agent 2: Fetcher Agent

**File:** `fetch_papers.py`

**Type:** Data Acquisition Agent

**Purpose:** Retrieves and processes research papers from arXiv API

**Configuration:**
```python
API: http://export.arxiv.org/api/query
Categories: cs.AI, cs.LG, cs.CV, cs.CL
Max Results: 20 papers
Sort: By submission date (descending)
Format: XML → JSON transformation
```

**Responsibilities:**
1. Construct API query with search parameters
2. Make HTTP GET request to arXiv API
3. Parse XML response with namespace handling
4. Extract paper metadata:
   - Title
   - Authors (first 3 + "et al.")
   - Abstract
   - Publication date
   - arXiv ID and links
   - Categories
5. Transform to JSON structure
6. Write to papers.json with timestamp

**Input:** None (uses hardcoded configuration)

**Output:** `papers.json` file with structured data

**Data Structure:**
```json
{
  "lastUpdated": "ISO-8601 timestamp",
  "papers": [
    {
      "title": "string",
      "authors": "string",
      "abstract": "string",
      "published": "YYYY-MM-DD",
      "link": "url",
      "pdfLink": "url",
      "categories": ["string"]
    }
  ]
}
```

**Error Handling:**
- Try-except blocks for network errors
- Fallback values for missing fields
- Logging of API errors
- Graceful degradation

**Dependencies:**
- requests: HTTP client
- xml.etree.ElementTree: XML parsing
- json: JSON serialization
- datetime: Timestamp generation

---

### Agent 3: Storage Agent

**File:** `papers.json`

**Type:** Data Persistence Agent

**Purpose:** Maintains persistent storage of paper data

**Configuration:**
```json
Format: JSON
Location: Repository root
Version Control: Yes (tracked by git)
Update Frequency: Daily
Size: ~20-50 KB
```

**Responsibilities:**
1. Store structured paper data
2. Maintain lastUpdated timestamp
3. Serve data to Display Agent
4. Version history via git

**Input:** Data from Fetcher Agent

**Output:** JSON data for Display Agent

**Schema Validation:**
- Required fields enforced by Fetcher
- Consistent structure guaranteed
- UTF-8 encoding

**Backup Strategy:**
- Git history provides full backup
- Previous versions retrievable
- No risk of data loss

---

### Agent 4: Display Agent

**Files:** 
- `arxiv.html` (structure)
- `arxiv.js` (logic)

**Type:** User Interface Agent

**Purpose:** Renders papers to users with interactive features

**Configuration:**
```javascript
Data Source: papers.json
Update: On page load
Features: Search + Filter
Rendering: Client-side (JavaScript)
Styling: CSS (purple gradient theme)
```

**Responsibilities:**
1. Load papers.json asynchronously
2. Parse JSON data
3. Render paper cards dynamically
4. Implement search functionality:
   - Search in title, authors, abstract
   - Highlight matching keywords
   - Show result count
5. Implement category filtering
6. Handle loading and error states
7. Escape HTML (prevent XSS)
8. Update UI in real-time

**Input:** papers.json file

**Output:** Interactive HTML display

**Features:**
- **Search:** Real-time keyword search
- **Filter:** Category-based filtering
- **Highlight:** Yellow highlighting of matches
- **Responsive:** Mobile-friendly design
- **Links:** Direct links to arXiv and PDF
- **Status:** Shows last updated time

**Technologies:**
- HTML5: Structure
- CSS3: Styling (flexbox, gradients)
- JavaScript ES6+: Logic (async/await, fetch)

---

## Agent Communication Protocol

### 1. Orchestrator → Fetcher
```
Trigger: subprocess.run('python fetch_papers.py')
Data: None (configuration is internal)
Response: Exit code (0 = success, 1 = failure)
```

### 2. Fetcher → Storage
```
Trigger: File write operation
Data: JSON object with papers array
Response: File system confirmation
```

### 3. Orchestrator → Storage
```
Trigger: git add, commit, push
Data: papers.json file
Response: Git commit SHA
```

### 4. Storage → Display
```
Trigger: HTTP GET request (fetch API)
Data: Complete papers.json file
Response: JSON object
```

### 5. Display → User
```
Trigger: Page load or interaction
Data: Rendered HTML with paper cards
Response: User interactions (search, filter, click)
```

## Agent Lifecycle

### Daily Cycle

```
00:00 UTC - Orchestrator wakes up (cron trigger)
00:00:05 - Environment provisioned (Ubuntu VM)
00:00:10 - Python and dependencies installed
00:00:15 - Fetcher Agent executes
00:00:20 - arXiv API called
00:00:25 - XML parsed, JSON created
00:00:30 - Storage Agent updated (papers.json)
00:00:35 - Orchestrator commits changes
00:00:40 - Changes pushed to GitHub
00:00:45 - GitHub Pages rebuild triggered
00:01:30 - Website updated with new papers
00:01:35 - Environment destroyed (VM terminated)

Next trigger: Tomorrow at 00:00 UTC
```

### On-Demand Cycle (Manual Trigger)

```
User clicks "Run workflow" in GitHub Actions
  → Same as daily cycle but at user-specified time
  → Useful for testing or immediate updates
```

### User Visit Cycle

```
User visits arxiv.html
  → Display Agent activates
  → Fetches papers.json
  → Parses data
  → Renders cards
  → Enables search/filter
  → Responds to interactions
```

## Configuration Files

### Primary Configuration
- **`.github/workflows/update-papers.yml`**: Main workflow definition
- **`fetch_papers.py`**: Fetcher configuration (API endpoint, categories)
- **`arxiv.js`**: Display configuration (UI behavior)

### Supporting Files
- **`.github/README.md`**: Workflow documentation
- **`.github/workflows/update-papers.yml.annotated`**: Detailed annotations
- **`papers.json`**: Runtime data (auto-generated)

## Agent Independence

Each agent is designed to be:

✅ **Autonomous:** Operates independently without manual intervention
✅ **Stateless:** No dependencies on previous runs (except Storage)
✅ **Isolated:** Failure of one doesn't affect others permanently
✅ **Testable:** Can be tested independently
✅ **Replaceable:** Can be swapped without affecting system

## Failure Recovery

### Fetcher Agent Failure
- Orchestrator logs error
- Email notification sent
- Previous papers.json remains intact
- Retry on next scheduled run

### Orchestrator Agent Failure
- GitHub Actions logs all steps
- Environment is destroyed safely
- No partial commits
- Next scheduled run proceeds normally

### Storage Agent Corruption
- Git history allows recovery
- Previous version can be restored
- Fetcher can regenerate data

### Display Agent Failure
- Shows error message to user
- Previous data still available
- JavaScript errors logged in console
- Doesn't affect backend operations

## Performance Metrics

| Agent | Execution Time | Resource Usage | Cost |
|-------|---------------|----------------|------|
| Orchestrator | 30-60s | 1 CPU, 2GB RAM | Free |
| Fetcher | 10-20s | Minimal (I/O bound) | Free |
| Storage | <1s | Disk write (~50KB) | Free |
| Display | <1s | Client-side only | Free |

**Total system cost:** $0/month (Free for public repositories)

## Scalability Considerations

### Current Limits
- 20 papers per fetch
- Daily updates
- Single API call per run

### Potential Improvements
- Increase to 50-100 papers (API allows up to 2000)
- Multiple categories queries
- Hourly updates (within rate limits)
- Parallel API calls for different categories

### Rate Limiting
- arXiv API: No strict limits for reasonable use
- GitHub Actions: 2,000 minutes/month (free tier)
- Current usage: ~1 minute/day = 30 minutes/month
- **Headroom:** 98.5% capacity remaining

## Security Audit

### Authentication
✅ No API keys required (arXiv is public)
✅ GitHub token auto-provided by Actions
✅ No secrets stored

### Permissions
✅ Minimal scope (contents:write only)
✅ No access to other repositories
✅ No user data access

### Code Security
✅ All dependencies from official sources
✅ No third-party GitHub Actions
✅ XSS protection in Display Agent
✅ Input validation in Fetcher Agent

### Data Security
✅ All data is public (research papers)
✅ No sensitive information processed
✅ Git provides full audit trail

## Testing Strategy

### Unit Testing
- Fetcher: Test API parsing independently
- Display: Test search/filter logic
- Storage: Validate JSON schema

### Integration Testing
- Test Orchestrator → Fetcher flow
- Test Fetcher → Storage flow
- Test Storage → Display flow

### End-to-End Testing
- Manual workflow trigger
- Verify papers.json update
- Check website display
- Test search functionality

### Continuous Testing
- Every commit triggers tests (if configured)
- Workflow runs daily (production test)
- User visits provide real-world validation

## Maintenance

### Regular Tasks
- Monitor workflow execution logs
- Review API response changes
- Update dependencies quarterly
- Check for GitHub Actions updates

### Irregular Tasks
- Adjust categories if research interests change
- Modify update frequency if needed
- Add features to Display Agent
- Optimize Fetcher performance

### Emergency Procedures
- Disable workflow if API down
- Rollback papers.json if corrupted
- Restore from git history if needed
- Contact arXiv support for API issues

---

**Document Version:** 1.0  
**Last Updated:** February 16, 2026  
**Maintained By:** Zilong Wang  
**Status:** Production Ready ✅
