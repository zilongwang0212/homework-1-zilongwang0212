// Load and display arXiv papers
let allPapers = [];
let currentFilter = 'all';

async function loadPapers() {
    try {
        const response = await fetch('papers.json');
        if (!response.ok) {
            throw new Error('Failed to load papers');
        }
        
        const data = await response.json();
        allPapers = data.papers || [];
        
        // Update last updated time
        if (data.lastUpdated) {
            document.getElementById('lastUpdated').textContent = 
                `Last updated: ${new Date(data.lastUpdated).toLocaleString()}`;
        }
        
        displayPapers(allPapers);
    } catch (error) {
        console.error('Error loading papers:', error);
        document.getElementById('paperList').innerHTML = 
            '<div class="error">Failed to load papers. The data might not be available yet. Please check back later.</div>';
    }
}

function displayPapers(papers) {
    const paperList = document.getElementById('paperList');
    
    if (!papers || papers.length === 0) {
        paperList.innerHTML = '<div class="error">No papers found. Please try again later.</div>';
        return;
    }
    
    paperList.innerHTML = papers.map(paper => `
        <div class="paper-card">
            <div class="paper-title">
                <a href="${paper.link}" target="_blank">${escapeHtml(paper.title)}</a>
            </div>
            <div class="paper-authors">
                ${escapeHtml(paper.authors)}
            </div>
            <div class="paper-date">
                Published: ${paper.published}
            </div>
            <div class="paper-abstract">
                ${escapeHtml(paper.abstract)}
            </div>
            <div class="paper-links">
                <a href="${paper.link}" target="_blank" class="paper-link">View on arXiv</a>
                <a href="${paper.pdfLink}" target="_blank" class="paper-link">📄 Download PDF</a>
            </div>
        </div>
    `).join('');
}

function filterPapers() {
    const filter = document.getElementById('categoryFilter').value;
    currentFilter = filter;
    
    if (filter === 'all') {
        displayPapers(allPapers);
    } else {
        const filtered = allPapers.filter(paper => 
            paper.categories && paper.categories.includes(filter)
        );
        displayPapers(filtered);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load papers when page loads
window.addEventListener('load', loadPapers);
