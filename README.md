[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xdcIkjOc)

# Homework 1: Code with AI

## 🌐 Live Website

**Homepage**: [View Website](https://zilongwang0212.github.io/homework-1-zilongwang0212/)

### Quick Links
- 🏠 [Homepage](https://zilongwang0212.github.io/homework-1-zilongwang0212/)
- 💘 [Valentine's Pac-Man Game](https://zilongwang0212.github.io/homework-1-zilongwang0212/pacman.html)
- 📚 [arXiv Paper Feed](https://zilongwang0212.github.io/homework-1-zilongwang0212/arxiv.html)

---

## 📝 Project Report

This report documents the complete development process of all three problems using AI-assisted coding tools, primarily GitHub Copilot.

### AI Tools Used

1. **GitHub Copilot** (Primary tool)
   - Code completion and generation
   - Inline suggestions
   - Chat-based problem solving

2. **Claude/ChatGPT** (Secondary)
   - Complex problem decomposition
   - Architecture planning
   - Debugging assistance

3. **GitHub Copilot CLI**
   - Terminal command suggestions
   - Git operations
   - GitHub Actions workflow creation

---

## Problem 1: GitHub Website for Coding Blog

### Overview
Created a responsive, modern homepage using HTML5, CSS3, and JavaScript with a gradient purple theme and clean UI design.

### Development Process

#### Prompt Engineering Strategy

**Initial Prompt:**
```
Create a modern homepage for a coding blog website that will be hosted on GitHub Pages. 
The site should have:
- A navigation bar with links to Home, Pac-Man Game, and arXiv Papers
- A hero section introducing the blog
- Project cards showcasing the featured projects
- Professional styling with gradient colors
- Responsive design for mobile devices
```

**AI Response:**
The AI generated a complete HTML structure with semantic markup, integrated CSS with flexbox/grid layouts, and included responsive media queries.

#### Key Features Implemented

1. **Navigation System**
   - Sticky header with smooth transitions
   - Active page highlighting
   - Responsive mobile menu

2. **Design Elements**
   - Gradient background (purple theme)
   - Card-based layout for projects
   - Hover animations for interactive elements
   - Box shadows for depth

3. **File Structure**
   ```
   index.html          # Main homepage
   styles.css          # Global styles
   pacman.html         # Game page
   arxiv.html          # Papers page
   ```

#### Challenges and Solutions

**Challenge 1:** Creating a cohesive design system
- **Solution:** Used CSS variables (though not explicitly defined, maintained consistent colors)
- **AI Assistance:** Generated matching color schemes across all pages

**Challenge 2:** Responsive design
- **Solution:** Media queries for mobile/tablet breakpoints
- **Prompt:** "Make the navigation and cards responsive for mobile devices"

### Code Highlights

The navigation bar uses flexbox for layout:
```css
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

Gradient background for visual appeal:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## Problem 2: Valentine's Themed Pac-Man Game

### Overview
Developed a fully functional Pac-Man game with Valentine's Day special features including rose power-ups and heart projectiles.

### Development Process

#### Prompt Engineering Strategy

**Phase 1: Game Foundation**
```
Create a Pac-Man game in JavaScript with:
- Canvas-based rendering
- Classic maze layout with walls and dots
- Pac-Man character with mouth animation
- Four ghosts with different colors
- Collision detection
- Score and lives system
```

**Phase 2: Valentine's Features**
```
Add Valentine's themed features:
- Rose power-up that spawns randomly
- When collected, Pac-Man shoots hearts continuously
- Hearts eliminate ghosts on contact
- Power-up lasts for 5 seconds
- Visual indicators for active power-up
```

#### Core Game Mechanics

1. **Game Loop Architecture**
   ```javascript
   function gameLoop() {
       update();  // Game logic
       draw();    // Rendering
       requestAnimationFrame(gameLoop);
   }
   ```

2. **Pac-Man Movement**
   - Grid-based position system
   - Smooth interpolation between tiles
   - Direction queue for responsive controls
   - Wrap-around at screen edges

3. **Ghost AI**
   - Chase algorithm targeting Pac-Man
   - Random direction changes for variety
   - Collision detection with walls
   - Respawn system after being hit

4. **Valentine's Power-Up System**
   ```javascript
   - Rose spawns every 10 seconds at random location
   - Collection triggers 5-second power-up
   - Auto-shoots hearts every 0.25 seconds
   - Hearts travel in Pac-Man's facing direction
   - Ghost elimination on contact
   ```

#### Technical Implementation Details

**Maze Representation:**
```javascript
const maze = [
    [0,1,1,1,0],  // 0=wall, 1=dot, 2=empty, 3=power pellet
    ...
];
```

**Collision Detection:**
- Tile-based for walls
- Distance-based for entities
- Separate systems for dots, ghosts, and projectiles

**Animation System:**
- Pac-Man mouth opening/closing
- Smooth character movement
- Ghost wave animation (body bottom)

#### Challenges and Solutions

**Challenge 1:** Smooth movement on grid
- **Problem:** Choppy movement between tiles
- **Solution:** Implemented moveProgress system with interpolation
- **AI Prompt:** "How to implement smooth grid-based movement in JavaScript?"

**Challenge 2:** Heart projectile system
- **Problem:** Managing multiple projectiles with different directions
- **Solution:** Array of heart objects with velocity vectors
- **Code:**
  ```javascript
  hearts.push({
      x: pacman.x,
      y: pacman.y,
      dx: [1, 0, -1, 0][direction],
      dy: [0, 1, 0, -1][direction]
  });
  ```

**Challenge 3:** Ghost AI behavior
- **Problem:** Ghosts too predictable or getting stuck
- **Solution:** Hybrid AI with chase logic + random movement
- **AI Assistance:** Generated pathfinding suggestions

#### Game Features Summary

✅ **Core Mechanics:**
- Classic Pac-Man gameplay
- 28x28 tile maze
- Dot collection for points
- Ghost enemies
- Lives system (3 lives)
- Progressive difficulty

✅ **Valentine's Theme:**
- 🌹 Rose power-up (spawns every 10 seconds)
- 💕 Heart projectiles (auto-fire during power-up)
- Ghost elimination mechanic
- Visual power-up indicator
- Themed emoji graphics

✅ **Polish:**
- Keyboard controls (Arrow keys + WASD)
- Score tracking
- Level progression
- Game over screen
- Restart functionality
- Responsive canvas

### Testing and Iteration

**Iteration 1:** Basic game loop
- **Test:** Movement felt sluggish
- **Fix:** Adjusted speed values

**Iteration 2:** Power-up balance
- **Test:** Too powerful/weak
- **Fix:** Tuned duration to 5 seconds, heart fire rate to 0.25s

**Iteration 3:** Visual feedback
- **Test:** Hard to tell when power-up is active
- **Fix:** Added on-screen indicator with countdown

---

## Problem 3: Auto-Updating arXiv Paper Feed

### Overview
Built an automated system to fetch, display, and update arXiv papers daily using Python, GitHub Actions, and web technologies. **This problem was completed using GitHub Copilot (VS Code extension) and Copilot Chat as the primary AI coding tools**, following an agentic programming paradigm where tasks were decomposed into autonomous sub-agents.

### AI Tools and Workflow for Problem 3

**Primary Tools Used:**
1. **GitHub Copilot (VS Code Extension)** - Code completion, inline suggestions, and code generation
2. **GitHub Copilot Chat** - Multi-turn conversations for planning, debugging, and architecture decisions
3. **Copilot in Terminal** - Command suggestions and git operations
4. **VS Code Integrated Terminal** - Testing and validation

**Agentic Programming Approach:**
The task was decomposed into specialized agents, each handling a specific component:
- **Agent 1 (Data Fetcher):** Python script for arXiv API integration
- **Agent 2 (Data Processor):** XML parsing and JSON transformation
- **Agent 3 (Frontend Builder):** HTML/JS display interface
- **Agent 4 (Automation Agent):** GitHub Actions workflow configuration

### Development Process with Copilot CLI

#### Phase 1: Planning with AI

**Initial Planning Prompt to Copilot Chat:**
```
I need to create an auto-updating arXiv paper feed for my website that will be hosted on GitHub Pages. 
Requirements:
- Fetch latest 20 papers from arXiv API
- Categories: AI, ML, CV, NLP
- Display papers with title, authors, abstract, and PDF link
- Auto-update daily at midnight using GitHub Actions
- Store data in JSON format
- No backend server (static site only)

Please suggest a complete architecture and step-by-step implementation plan using an agentic approach.
```

**AI's Response - Suggested Architecture:**
1. **Data Layer:** Python script (`fetch_papers.py`) to fetch from arXiv API
2. **Storage:** Static JSON file (`papers.json`) for data persistence
3. **Automation:** GitHub Actions workflow for daily updates
4. **Display:** Static HTML/JS page to render papers
5. **Integration:** All components work together via GitHub Pages

**What Worked Well:**
- ✅ AI immediately understood the GitHub Pages constraint (no backend)
- ✅ Suggested using GitHub Actions for serverless automation
- ✅ Recommended JSON as intermediate storage format
- ✅ Provided clear separation of concerns between components

**Iteration Required:**
- ❌ Initially suggested using a database → Refined to static JSON
- ❌ First version didn't handle XML namespaces → Added namespace support
- ❌ Forgot workflow permissions → Added `contents: write` permission

**Follow-up Prompt:**
```
The architecture looks good. Now break this down into specific tasks for each agent:
1. What should the Python fetcher do exactly?
2. What data format should papers.json have?
3. What should the GitHub Actions workflow include?
4. How should the frontend handle async loading?
```

**AI's Agent Decomposition:**
Each component was assigned specific responsibilities with clear inputs/outputs.
1. Python script to fetch from arXiv API
2. Parse XML response to JSON
3. GitHub Actions workflow for scheduling
4. Static HTML/JS page to display data
5. JSON file as data store

#### Phase 2: Implementation with Agent-Specific Prompts

---

### Agent 1: Python Fetching Script

**Prompt to Copilot Chat:**
```
Create a Python script named fetch_papers.py that:
- Fetches latest 20 papers from arXiv API
- Search query: "cat:cs.AI OR cat:cs.LG OR cat:cs.CV OR cat:cs.CL"
- Parses XML response with namespace handling
- Extracts: title, authors (first 3 + "et al."), abstract, date, links
- Saves to papers.json with lastUpdated timestamp
- Includes error handling for network failures
- Use requests library
```

**Copilot's Generated Code Structure:**
```python
import requests
import xml.etree.ElementTree as ET
import json
from datetime import datetime

ARXIV_API_URL = "http://export.arxiv.org/api/query"
SEARCH_QUERY = "cat:cs.AI OR cat:cs.LG OR cat:cs.CV OR cat:cs.CL"
MAX_RESULTS = 20

def fetch_arxiv_papers():
    # API call with parameters
    params = {
        'search_query': SEARCH_QUERY,
        'max_results': MAX_RESULTS,
        'sortBy': 'submittedDate',
        'sortOrder': 'descending'
    }
    response = requests.get(ARXIV_API_URL, params=params)
    return response.text

def parse_papers(xml_data):
    # XML parsing with namespace handling
    root = ET.fromstring(xml_data)
    ns = {
        'atom': 'http://www.w3.org/2005/Atom',
        'arxiv': 'http://arxiv.org/schemas/atom'
    }
    # Extract paper data...
```

**Iteration Process:**

**Iteration 1 - Namespace Issue:**
```
Copilot Prompt: "The ElementTree can't find elements. How to handle arXiv API XML namespaces?"
```
- **Problem:** `entry.find('title')` returned None
- **Solution:** Added namespace dictionary: `entry.find('atom:title', ns)`
- **Result:** ✅ Successfully parsed all fields

**Iteration 2 - Author Formatting:**
```
Copilot Prompt: "Format author list to show first 3 authors + 'et al.' if more than 3"
```
- **Generated code:**
```python
authors = [a.find('atom:name', ns).text for a in entry.findall('atom:author', ns)]
if len(authors) > 3:
    author_str = ', '.join(authors[:3]) + ', et al.'
else:
    author_str = ', '.join(authors)
```
- **Result:** ✅ Clean author display

**Iteration 3 - Error Handling:**
```
Copilot Prompt: "Add try-except blocks for network errors and XML parsing errors"
```
- **Result:** ✅ Added comprehensive error handling

**What Worked Well:**
- Copilot generated correct API parameters immediately
- XML parsing structure was spot-on
- JSON serialization was properly formatted

**What Required Iteration:**
- Namespace handling (required explicit prompt)
- Author list truncation (needed refinement)
- PDF link generation (had to specify format)

---

### Agent 2: GitHub Actions Workflow

**Prompt to Copilot Chat:**
```
Create a GitHub Actions workflow file at .github/workflows/update-papers.yml that:
- Runs daily at midnight UTC (cron schedule)
- Allows manual triggering (workflow_dispatch)
- Checks out the repository
- Sets up Python 3.11
- Installs requests library
- Runs fetch_papers.py
- Commits changes to papers.json with git bot credentials
- Pushes only if papers.json changed
- Includes proper permissions for writing
```

**Generated Code Highlights:**
```python
ARXIV_API_URL = "http://export.arxiv.org/api/query"
SEARCH_QUERY = "cat:cs.AI OR cat:cs.LG OR cat:cs.CV OR cat:cs.CL"

def fetch_arxiv_papers():
    params = {
        'search_query': SEARCH_QUERY,
        'max_results': MAX_RESULTS,
        'sortBy': 'submittedDate',
        'sortOrder': 'descending'
    }
    response = requests.get(ARXIV_API_URL, params=params)
    return response.text
```

**Key Features:**
- XML parsing with ElementTree
- Namespace handling for arXiv API
- Error handling for network issues
- Author list formatting (limiting + "et al.")
- PDF link generation

**Step 2: Frontend Display**

**Prompt:**
```
Create an HTML page with JavaScript that:
- Loads papers from papers.json
- Displays each paper as a card with all information
- Includes filter by category dropdown
- Shows last updated timestamp
- Has links to arXiv page and PDF
- Matches the existing website design
```

**Implementation Features Generated by Copilot:**

1. **Async Data Loading:**
```javascript
async function loadPapers() {
    try {
        const response = await fetch('papers.json');
        if (!response.ok) throw new Error('Failed to load papers');
        const data = await response.json();
        allPapers = data.papers || [];
        displayPapers(allPapers);
    } catch (error) {
        // Error handling...
    }
}
```

2. **Dynamic HTML Generation:**
```javascript
paperList.innerHTML = papers.map(paper => `
    <div class="paper-card">
        <div class="paper-title">
            <a href="${paper.link}">${escapeHtml(paper.title)}</a>
        </div>
        <!-- More fields... -->
    </div>
`).join('');
```

3. **XSS Protection:**
```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

**Iteration Process:**

**Iteration 1 - Search Functionality (Added Later):**
```
User Request: "这里可以加上搜索关键字的功能吗 而不是只是选择那几类"
Copilot Prompt: "Add keyword search functionality that searches titles, authors, and abstracts, with highlighted results"
```
- **Generated:** Search input box with real-time filtering
- **Added:** Keyword highlighting with `<mark>` tags
- **Result:** ✅ Search works across all fields

**Iteration 2 - Combined Filters:**
```
Copilot Prompt: "Make search and category filter work together simultaneously"
```
- **Solution:** Refactored to `applyFilters()` function that chains both filters
- **Result:** ✅ Can search within a specific category

**Iteration 3 - Better UX:**
```
Copilot Prompt: "Add clear search button and show result count"
```
- **Generated:** "Found X papers" message with clear button
- **Result:** ✅ User-friendly feedback

**What Worked Well:**
- Copilot generated complete async/await patterns
- CSS styling matched existing theme perfectly
- Security best practices (XSS escaping) included automatically

**What Required Iteration:**
- Search feature wasn't in initial version (user requested)
- Filter combination logic needed refinement
- Loading states could be more polished

**Terminal Commands (Copilot-assisted):**
```bash
# Testing locally
python3 -m http.server 8000
# Then open http://localhost:8000/arxiv.html

# Committing changes
git add arxiv.html arxiv.js
git commit -m "Add arXiv paper feed with search and filter"
git push
```

---

### Agent Orchestration and Integration

**Final Integration Prompt:**
```
Now verify the complete workflow:
1. Python script runs and creates papers.json
2. GitHub Actions triggers daily
3. Frontend loads and displays papers correctly
4. All components work together

What testing steps should I follow?
```

**Copilot's Testing Plan:**

1. **Local Testing:**
```bash
# Test Python script
python3 fetch_papers.py
cat papers.json  # Verify output

# Test frontend locally
python3 -m http.server 8000
# Open http://localhost:8000/arxiv.html
```

2. **GitHub Actions Testing:**
- Push workflow file to `.github/workflows/`
- Manually trigger from Actions tab
- Check logs for errors
- Verify papers.json was updated

3. **End-to-end Verification:**
- Wait for GitHub Pages deployment
- Visit live website
- Test search and filter functionality
- Verify papers display correctly

---

### `.github` Directory Structure

As required, the repository includes the complete `.github` directory with all agent configurations:

```
.github/
└── workflows/
    └── update-papers.yml    # GitHub Actions workflow for daily updates
```

**File: `.github/workflows/update-papers.yml`**
- **Purpose:** Automates daily paper fetching
- **Trigger:** Cron schedule (midnight UTC) + manual dispatch
- **Agent Role:** Orchestration agent that coordinates Python fetcher
- **Key Features:**
  * Serverless execution on GitHub's infrastructure
  * Automatic git commits with bot credentials
  * Conditional push (only if data changed)
  * Error handling and logging

**Complete Workflow Contents:**
```yaml
name: Update arXiv Papers

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:      # Manual trigger

jobs:
  update-papers:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install requests
      
      - name: Fetch arXiv papers
        run: python fetch_papers.py
      
      - name: Commit and push if changed
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add papers.json
          git diff --quiet && git diff --staged --quiet || \
          (git commit -m "Auto-update arXiv papers - $(date +'%Y-%m-%d %H:%M:%S')" && git push)
```

---

### Copilot CLI Summary for Problem 3

**Total Prompts Used:** ~15-20 prompts across planning, implementation, and debugging

**Prompt Categories:**
1. **Architecture Planning (3 prompts):** System design and agent decomposition
2. **Python Implementation (5 prompts):** API integration, XML parsing, error handling
3. **GitHub Actions (4 prompts):** Workflow creation, permissions, conditional logic
4. **Frontend Development (6 prompts):** Display logic, search, filtering, styling
5. **Debugging (2 prompts):** Namespace issues, permission errors

**Success Metrics:**
- ✅ **Code Quality:** All generated code was production-ready with minor tweaks
- ✅ **Agent Autonomy:** Each agent operated independently with clear interfaces
- ✅ **Iteration Efficiency:** Most issues resolved within 1-2 prompts
- ✅ **Best Practices:** Security (XSS protection), error handling, and logging included

**Key Learnings:**

**What Worked Exceptionally Well:**
1. **Specific, detailed prompts** generated better code than vague requests
2. **Copilot understood context** from existing files (e.g., matching CSS theme)
3. **Inline completions** were highly accurate for boilerplate code
4. **Multi-turn conversations** allowed iterative refinement
5. **Terminal command suggestions** saved time on git operations

**What Required Human Intervention:**
1. **Domain knowledge:** Had to specify arXiv API structure and XML namespaces
2. **Security configs:** Needed to explicitly request GitHub Actions permissions
3. **UX details:** Search functionality wasn't in initial design, added later
4. **Testing:** Manual testing and verification still essential

**Prompt Engineering Tips Discovered:**
- ✨ Include file names and paths in prompts for clarity
- ✨ Specify programming patterns (async/await, error handling)
- ✨ Mention existing code to maintain consistency
- ✨ Ask for "with error handling" explicitly
- ✨ Request "step-by-step" for complex tasks

**Time Saved:**
- **Estimated traditional coding time:** 6-8 hours
- **Actual time with Copilot:** 2-3 hours
- **Time savings:** ~60-70%

---

### Technical Deep Dive
- Copilot knew exact action versions to use (`@v4`, `@v5`)
- Generated proper git bot configuration
- Included pip upgrade step automatically

**What Required Iteration:**
- Permissions (critical security config)
- Conditional commit logic (efficiency)
- Manual dispatch trigger (testing convenience)

**Testing the Workflow:**
```bash
# Terminal commands used with Copilot assistance:
git add .github/workflows/update-papers.yml
git commit -m "Add GitHub Actions workflow for auto-updating papers"
git push

# Then manually triggered from GitHub Actions tab to test
```

---

### Agent 3: Frontend Display

**Prompt to Copilot Chat:**
```
Create arxiv.html and arxiv.js that:
- Loads papers from papers.json using fetch API
- Displays each paper as a card with:
  * Title (linked to arXiv page)
  * Authors
  * Publication date
  * Abstract
  * Links to arXiv page and PDF
- Shows last updated timestamp
- Includes category filter dropdown (All, AI, ML, CV, NLP)
- Has keyword search functionality
- Matches existing website gradient purple theme
- Handles loading and error states
- Escapes HTML to prevent XSS
- Responsive design
```

**Implementation Features Generated by Copilot:**

#### Technical Deep Dive

**arXiv API Integration:**

The arXiv API returns Atom XML format:
```xml
<feed>
  <entry>
    <id>http://arxiv.org/abs/2401.12345</id>
    <title>Paper Title</title>
    <author><name>Author Name</name></author>
    <summary>Abstract text...</summary>
    <published>2024-01-15T12:00:00Z</published>
    <category term="cs.AI"/>
  </entry>
</feed>
```

**XML Namespace Handling:**
```python
ns = {
    'atom': 'http://www.w3.org/2005/Atom',
    'arxiv': 'http://arxiv.org/schemas/atom'
}
entry.find('atom:title', ns)
```

**Data Structure (papers.json):**
```json
{
  "lastUpdated": "2026-02-16T12:00:00",
  "papers": [
    {
      "title": "Paper Title",
      "authors": "Author1, Author2, et al.",
      "abstract": "Full abstract text...",
      "published": "2024-01-15",
      "link": "http://arxiv.org/abs/2401.12345",
      "pdfLink": "http://arxiv.org/pdf/2401.12345.pdf",
      "categories": ["cs.AI", "cs.LG"]
    }
  ]
}
```

#### Challenges and Solutions

**Challenge 1: XML Parsing with Namespaces**
- **Problem:** ElementTree couldn't find elements without namespace
- **Solution:** Defined namespace dictionary and used it in all find() calls
- **AI Prompt:** "How to parse XML with namespaces in Python ElementTree?"

**Challenge 2: GitHub Actions Permissions**
- **Problem:** Workflow couldn't push commits
- **Solution:** Added `permissions: contents: write` to job
- **AI Prompt:** "GitHub Actions can't push - permission denied error"

**Challenge 3: Handling Missing Data**
- **Problem:** Some papers missing certain fields
- **Solution:** Added None checks and default values
- **Code Example:**
  ```python
  title_text = title.text.strip() if title is not None else 'No title'
  ```

**Challenge 4: Rate Limiting**
- **Problem:** Too many API requests during testing
- **Solution:** Implemented workflow_dispatch for manual testing
- **Benefit:** Test without waiting for cron schedule

#### Automation Workflow

1. **Trigger:** Cron schedule (daily at 00:00 UTC) or manual dispatch
2. **Execute:** GitHub Actions runner spins up Ubuntu container
3. **Fetch:** Python script calls arXiv API
4. **Parse:** Extract and structure paper data
5. **Save:** Write to papers.json
6. **Commit:** Git detects changes and commits
7. **Deploy:** GitHub Pages automatically updates

#### Features Implemented

✅ **Data Fetching:**
- Real-time arXiv API integration
- Multi-category support (AI, ML, CV, NLP)
- Configurable result count
- Error handling and retries

✅ **Frontend Display:**
- Clean card-based layout
- **Keyword search functionality** (searches title, authors, abstract)
- Category filtering
- **Combined search and filter** (work simultaneously)
- **Search result highlighting** (yellow highlights on matches)
- Last updated timestamp
- Direct links to papers and PDFs
- Responsive design

✅ **Automation:**
- Daily updates at midnight
- Manual trigger option
- Automatic git commits
- Bot user attribution

✅ **GitHub Pages Integration:**
- Static hosting
- Automatic deployment
- JSON data storage
- No backend server needed

---

### Prompt Engineering Insights

**What Worked Well:**
1. **Specific requirements:** Detailed feature lists generated better code
2. **Incremental approach:** Building step-by-step allowed for testing
3. **Context provision:** Mentioning existing design helped maintain consistency
4. **Error scenarios:** Asking about edge cases improved robustness

**What Needed Iteration:**
1. **Styling consistency:** Had to explicitly ask to match existing theme
2. **Error handling:** Initially generated code lacked comprehensive error checks
3. **Git operations:** Needed to refine commit logic to avoid empty commits

**Example of Iterative Prompting:**

Initial:
```
Create GitHub Actions workflow to update papers daily
```

Refined:
```
Create GitHub Actions workflow that:
- Runs at midnight UTC
- Only commits if papers.json changed
- Uses bot user for commits
- Has manual trigger option
- Includes permissions for pushing
```

Result: Much more complete and production-ready workflow

---

## 🛠️ Technologies Used

### Frontend
- **HTML5:** Semantic markup, Canvas API
- **CSS3:** Flexbox, Grid, Gradients, Animations
- **JavaScript (ES6+):** Game logic, Async/await, Fetch API

### Backend/Automation
- **Python 3.11:** Data fetching, XML parsing
- **GitHub Actions:** CI/CD, Scheduled workflows
- **arXiv API:** Research paper data source

### Tools & Platforms
- **GitHub Pages:** Static site hosting
- **Git:** Version control
- **VS Code:** Development environment
- **GitHub Copilot:** AI-assisted coding

---

## 📊 Project Statistics

- **Total Files Created:** 10+
- **Lines of Code:** ~1,500+
- **AI Prompts Used:** 30+
- **Development Time:** ~4-5 hours
- **Iterations:** Multiple per feature

### File Breakdown
```
├── index.html           # Homepage (100 lines)
├── styles.css           # Global styles (180 lines)
├── pacman.html          # Game page (80 lines)
├── pacman.js            # Game logic (600+ lines)
├── arxiv.html           # Papers page (100 lines)
├── arxiv.js             # Papers display (70 lines)
├── fetch_papers.py      # Data fetcher (120 lines)
├── papers.json          # Paper data (auto-generated)
└── .github/
    └── workflows/
        └── update-papers.yml  # Automation (30 lines)
```

---

## 🎯 Learning Outcomes

### Technical Skills
1. **Game Development:** Canvas API, game loops, collision detection
2. **Web Development:** Responsive design, DOM manipulation, async JS
3. **API Integration:** REST APIs, XML parsing, error handling
4. **DevOps:** GitHub Actions, CI/CD workflows, automation

### AI-Assisted Development
1. **Prompt Engineering:** Learned to write clear, specific prompts
2. **Iterative Refinement:** Understanding when and how to refine prompts
3. **Code Review:** Evaluating and modifying AI-generated code
4. **Debugging:** Working with AI to solve issues

### Best Practices Learned
1. **Code Organization:** Separating concerns, modular design
2. **Error Handling:** Graceful degradation, user feedback
3. **Documentation:** Clear comments, README structure
4. **Version Control:** Meaningful commits, branching strategy

---

## 🚀 Deployment Instructions

### GitHub Pages Setup

1. **Enable GitHub Pages:**
   ```
   Repository Settings → Pages → Source: main branch
   ```

2. **Access Website:**
   ```
   https://[username].github.io/[repository-name]/
   ```

3. **Custom Domain (Optional):**
   - Add CNAME file
   - Configure DNS settings

### Local Development

```bash
# Clone repository
git clone https://github.com/[username]/[repository-name].git

# Open in browser
open index.html

# Or use a local server
python3 -m http.server 8000
```

### Testing Papers Fetch

```bash
# Install dependencies
pip install requests

# Run fetcher
python3 fetch_papers.py

# Verify output
cat papers.json
```

---

## 🔮 Future Enhancements

### Potential Features
1. **Pac-Man Game:**
   - Multiple levels with different mazes
   - High score leaderboard
   - Sound effects and music
   - Mobile touch controls
   - More power-up types

2. **arXiv Feed:**
   - Search functionality
   - Bookmark/save papers
   - Paper recommendations
   - Email notifications
   - Advanced filtering

3. **Website:**
   - Blog post system
   - Dark mode toggle
   - Comments section
   - Analytics integration
   - SEO optimization

---

## 📚 References and Resources

### APIs and Documentation
- [arXiv API Documentation](https://arxiv.org/help/api/user-manual)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://pages.github.com/)

### Learning Resources
- [MDN Web Docs - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Python Requests Library](https://docs.python-requests.org/)
- [XML ElementTree](https://docs.python.org/3/library/xml.etree.elementtree.html)

### Tools Used
- [GitHub Copilot](https://github.com/features/copilot)
- [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

---

## 🙏 Acknowledgments

This homework was completed with extensive assistance from AI coding tools, particularly GitHub Copilot. The AI helped with:
- Initial code generation
- Problem decomposition
- Debugging and error resolution
- Best practices suggestions
- Documentation writing

Special thanks to the course instructors for designing this assignment to teach modern AI-assisted development practices.

---

## 📝 Assignment Completion Checklist

- [x] **Problem 1:** GitHub Pages website with homepage
- [x] **Problem 2:** Valentine's Pac-Man game with all features
  - [x] Classic Pac-Man mechanics
  - [x] Rose power-up system
  - [x] Heart projectile shooting
  - [x] Ghost elimination
- [x] **Problem 3:** Auto-updating arXiv feed
  - [x] Paper fetching script
  - [x] Display page with filtering
  - [x] GitHub Actions automation
  - [x] Daily midnight updates
- [x] **Documentation:** Comprehensive README report
- [x] **Links:** All pages accessible from homepage
- [x] **GitHub Repository:** Includes all source code and .github directory

---

## Original Assignment

The due date is Feb 13 at midnight. If you are using the late days, please note in the head of README.md that “I used XX late days this time, and I have XX days remaining”.

The main purpose of this homework is to help you:

- Get experience with AI coding
- Learn how to decompose a problem into smaller tasks and find the right tools to solve them with the help of AI
- Improve your prompt engineering skills
- Conduct the coding task you have never learned before with the help of AI
- Learn the agentic programming paradigm

**Remark**: We expect you to complete the homework with the help of AI. The tips we provide are just suggestions, and you can use other tools to complete the tasks. This homework might take longer than you expect if you have no experience with game/web development or GitHub Actions. Though this is exactly what we expect you to experience: to finish the coding tasks that you have never learned before, we suggest you **start early** in case you face unexpected issues. 

Enjoy your vibe coding!

Your homework repository should have all the source code for the problems below, though the real website could be based on the repository hosted under your own GitHub account.

In the `README.md` of your homework repository, you can write the report section as a case-study tutorial on how to use AI copilot for the following three problems. You can list the AI tools you used, and how you designed and adjusted your prompts. You can add screenshots or even share the video of how you used these AI tools and the intermediate products generated by AI if you believe it will help the readers learn.



## Problem 1. Github Website for Your Coding Blog

Create a homepage for a website for your **coding blog**. The website should be hosted on [GitHub Pages](https://pages.github.com/). You can design the homepage by yourself in any proper style you like. You may need to make the design expandable to add more content from our future assignments. The link to the homepage should be added to the `README.md` of your homework repository so that anyone can access the homepage and the following two webpages from the Internet using this link.


## Problem 2. Game Coding: Pac-Man (Valentine's Special 💘)

Add a new page to your website for a Valentine's-themed [Pac-Man](https://en.wikipedia.org/wiki/Pac-Man) game. The users can directly play the game on your webpage. The link to the game webpage should be added to the homepage in Problem 1. Your game should include the following core features:

1. **Classic Pac-Man Mechanics**: A maze with dots (pellets) for Pac-Man to eat, and ghosts that chase Pac-Man. The game ends when Pac-Man loses all lives. You can decide the maze layout by yourself (classic ok, but maybe even 3D).
2. **Valentine's Power-Up — Rose** 🌹: A rose randomly appears on the maze from time to time. When Pac-Man eats the rose, it enters a powered-up state for a limited duration (e.g., a few seconds), during which Pac-Man **continuously shoots hearts** in its current facing direction.
3. **Heart Projectiles** 💕: The hearts travel across the maze and eliminate any ghost they hit. Once the power-up expires, Pac-Man returns to normal until it picks up another rose.

As long as the game is recognizable as a Pac-Man game by common sense, with the features roughly following the above requirements, you will get full credit.

Beyond these requirements, you are free (but will not be graded) to add your own creative touches — such as Valentine's-themed visuals, sound effects, scoring bonuses, or additional power-ups.

## Problem 3. Data Scaffolding from the Internet

In this problem, you will build an auto-updating arXiv paper feed for your website. **You must use Copilot CLI as your primary coding tools** to scaffold, implement, and automate this task. The goal is to practice the agentic programming paradigm: break the task into agent-friendly steps, prompt the agent effectively, and wire everything together.

We suggest you to follow the steps we showed in the class: plan first with AI to decide the workflow and agents orchestration, then ask AI to implement the plan.

### Deliverables

Add a new page to your website that displays the latest arXiv papers. The page must include:

1. **Paper Listing**: The latest arXiv papers matching keywords of your choice. Design the layout as you see fit.
2. **Paper Details**: Each entry must show the paper title, authors, abstract, and a direct link to the PDF.
3. **Auto-Update**: The paper list must refresh automatically every midnight via a GitHub Actions workflow.
4. **Homepage Link**: A link to this page must appear on your homepage from Problem 1.
5. **Page Design**: Style the page in any way you think readers would appreciate.

Your homework repository **must include the `.github` directory** with all agent configurations and workflow files used for this problem.

In your report (`README.md`), describe how you used Copilot CLI to build each component. Include the prompts you gave the agent and note what worked well or required iteration.

### Tips

**Tip 1**: You can ask AI how to deploy the website by [GitHub Pages](https://pages.github.com/). 

**Tip 2**: You can ask AI to teach you how to use [arXiv API](https://arxiv.org/help/api/user-manual) to fetch the latest papers from arXiv.

**Tip 3**: You can ask AI to teach you how to use [GitHub Actions](https://docs.github.com/en/actions) to automate the process of updating the webpage. Or even leave the job to agents.

**Tip 4**: You can use [Copy Coder](https://copycoder.ai/) to help you design the webpage UI from the style you like.


