// Load and display arXiv papers
let allPapers = [];
let currentFilter = 'all';
let currentSearchQuery = '';

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
        if (currentSearchQuery) {
            paperList.innerHTML = `
                <div class="error">
                    No papers found matching "${currentSearchQuery}". 
                    <br><br>
                    <span class="clear-search" onclick="clearSearch()" style="font-size: 1rem;">
                        ✕ Clear search and show all papers
                    </span>
                </div>
            `;
        } else {
            paperList.innerHTML = '<div class="error">No papers found. Please try again later.</div>';
        }
        return;
    }
    
    paperList.innerHTML = papers.map(paper => {
        // Highlight search terms if searching
        let displayTitle = escapeHtml(paper.title);
        let displayAuthors = escapeHtml(paper.authors);
        let displayAbstract = escapeHtml(paper.abstract);
        
        if (currentSearchQuery) {
            const regex = new RegExp(`(${currentSearchQuery})`, 'gi');
            displayTitle = displayTitle.replace(regex, '<mark>$1</mark>');
            displayAuthors = displayAuthors.replace(regex, '<mark>$1</mark>');
            displayAbstract = displayAbstract.replace(regex, '<mark>$1</mark>');
        }
        
        return `
            <div class="paper-card">
                <div class="paper-title">
                    <a href="${paper.link}" target="_blank">${displayTitle}</a>
                </div>
                <div class="paper-authors">
                    ${displayAuthors}
                </div>
                <div class="paper-date">
                    Published: ${paper.published}
                </div>
                <div class="paper-abstract">
                    ${displayAbstract}
                </div>
                <div class="paper-links">
                    <a href="${paper.link}" target="_blank" class="paper-link">View on arXiv</a>
                    <a href="${paper.pdfLink}" target="_blank" class="paper-link">📄 Download PDF</a>
                </div>
            </div>
        `;
    }).join('');
}

function filterPapers() {
    const filter = document.getElementById('categoryFilter').value;
    currentFilter = filter;
    applyFilters();
}

function searchPapers() {
    const searchInput = document.getElementById('searchInput');
    currentSearchQuery = searchInput.value.trim().toLowerCase();
    applyFilters();
}

function handleSearchInput(event) {
    if (event.key === 'Enter') {
        searchPapers();
    }
}

function applyFilters() {
    let filtered = allPapers;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(paper => 
            paper.categories && paper.categories.includes(currentFilter)
        );
    }
    
    // Apply search query
    if (currentSearchQuery) {
        filtered = filtered.filter(paper => {
            const titleMatch = paper.title.toLowerCase().includes(currentSearchQuery);
            const authorMatch = paper.authors.toLowerCase().includes(currentSearchQuery);
            const abstractMatch = paper.abstract.toLowerCase().includes(currentSearchQuery);
            return titleMatch || authorMatch || abstractMatch;
        });
        
        // Update search info
        const searchInfo = document.getElementById('searchInfo');
        searchInfo.innerHTML = `
            Found ${filtered.length} paper(s) matching "${currentSearchQuery}"
            <span class="clear-search" onclick="clearSearch()">✕ Clear search</span>
        `;
    } else {
        document.getElementById('searchInfo').innerHTML = '';
    }
    
    displayPapers(filtered);
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    currentSearchQuery = '';
    document.getElementById('searchInfo').innerHTML = '';
    applyFilters();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load papers when page loads
window.addEventListener('load', loadPapers);
