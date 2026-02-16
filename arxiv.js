// Load and display arXiv papers
let allPapers = [];
let currentCategoryFilter = 'all';
let currentTopicFilter = 'all';
let currentSearchQuery = '';
let availableTopics = [];

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
        
        // Populate topic filter
        if (data.topics) {
            availableTopics = data.topics;
            populateTopicFilter(data.topics);
        }
        
        displayPapers(allPapers);
    } catch (error) {
        console.error('Error loading papers:', error);
        document.getElementById('paperList').innerHTML = 
            '<div class="error">Failed to load papers. The data might not be available yet. Please check back later.</div>';
    }
}

function populateTopicFilter(topics) {
    const topicSelect = document.getElementById('topicFilter');
    
    // Add options for each topic
    Object.entries(topics).forEach(([topicId, topicInfo]) => {
        const option = document.createElement('option');
        option.value = topicInfo.name;
        option.textContent = `${topicInfo.name} (${topicInfo.count})`;
        topicSelect.appendChild(option);
    });
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
                    ${paper.topic ? `<span style="color: #764ba2; font-size: 0.85rem; margin-left: 0.5rem;">📌 ${paper.topic}</span>` : ''}
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
    currentCategoryFilter = document.getElementById('categoryFilter').value;
    currentTopicFilter = document.getElementById('topicFilter').value;
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
    
    // Apply topic filter
    if (currentTopicFilter !== 'all') {
        filtered = filtered.filter(paper => 
            paper.topic === currentTopicFilter
        );
    }
    
    // Apply category filter
    if (currentCategoryFilter !== 'all') {
        filtered = filtered.filter(paper => 
            paper.categories && paper.categories.includes(currentCategoryFilter)
        );
    }
    
    // Apply search query
    if (currentSearchQuery) {
        filtered = filtered.filter(paper => {
            const titleMatch = paper.title.toLowerCase().includes(currentSearchQuery);
            const authorMatch = paper.authors.toLowerCase().includes(currentSearchQuery);
            const abstractMatch = paper.abstract.toLowerCase().includes(currentSearchQuery);
            const topicMatch = paper.topic && paper.topic.toLowerCase().includes(currentSearchQuery);
            return titleMatch || authorMatch || abstractMatch || topicMatch;
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
