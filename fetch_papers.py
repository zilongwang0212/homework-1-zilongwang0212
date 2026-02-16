import requests
import xml.etree.ElementTree as ET
import json
from datetime import datetime

# Configuration
ARXIV_API_URL = "http://export.arxiv.org/api/query"
SEARCH_QUERY = "cat:cs.AI OR cat:cs.LG OR cat:cs.CV OR cat:cs.CL"  # AI, ML, Computer Vision, NLP
MAX_RESULTS = 20
OUTPUT_FILE = "papers.json"

def fetch_arxiv_papers():
    """Fetch latest papers from arXiv API"""
    params = {
        'search_query': SEARCH_QUERY,
        'start': 0,
        'max_results': MAX_RESULTS,
        'sortBy': 'submittedDate',
        'sortOrder': 'descending'
    }
    
    try:
        response = requests.get(ARXIV_API_URL, params=params, timeout=30)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching papers: {e}")
        return None

def parse_arxiv_response(xml_data):
    """Parse XML response from arXiv API"""
    papers = []
    
    try:
        root = ET.fromstring(xml_data)
        
        # Define namespace
        ns = {
            'atom': 'http://www.w3.org/2005/Atom',
            'arxiv': 'http://arxiv.org/schemas/atom'
        }
        
        # Parse each entry (paper)
        for entry in root.findall('atom:entry', ns):
            # Extract paper information
            title = entry.find('atom:title', ns)
            title_text = title.text.strip().replace('\n', ' ') if title is not None else 'No title'
            
            # Authors
            authors = entry.findall('atom:author', ns)
            author_names = [author.find('atom:name', ns).text for author in authors if author.find('atom:name', ns) is not None]
            authors_text = ', '.join(author_names[:5])  # Limit to first 5 authors
            if len(author_names) > 5:
                authors_text += ', et al.'
            
            # Abstract
            summary = entry.find('atom:summary', ns)
            abstract = summary.text.strip().replace('\n', ' ') if summary is not None else 'No abstract available'
            
            # Published date
            published = entry.find('atom:published', ns)
            published_text = published.text[:10] if published is not None else 'Unknown'
            
            # Links
            link = entry.find('atom:id', ns)
            arxiv_id = link.text if link is not None else ''
            paper_link = arxiv_id
            pdf_link = arxiv_id.replace('/abs/', '/pdf/') + '.pdf'
            
            # Categories
            categories = entry.findall('atom:category', ns)
            category_list = [cat.get('term') for cat in categories if cat.get('term')]
            
            paper = {
                'title': title_text,
                'authors': authors_text,
                'abstract': abstract,
                'published': published_text,
                'link': paper_link,
                'pdfLink': pdf_link,
                'categories': category_list
            }
            
            papers.append(paper)
        
        return papers
    
    except ET.ParseError as e:
        print(f"Error parsing XML: {e}")
        return []

def save_papers_to_json(papers):
    """Save papers to JSON file"""
    data = {
        'lastUpdated': datetime.now().isoformat(),
        'papers': papers
    }
    
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Successfully saved {len(papers)} papers to {OUTPUT_FILE}")
    except IOError as e:
        print(f"Error saving to file: {e}")

def main():
    print("Fetching latest arXiv papers...")
    xml_data = fetch_arxiv_papers()
    
    if xml_data:
        print("Parsing papers...")
        papers = parse_arxiv_response(xml_data)
        
        if papers:
            print(f"Found {len(papers)} papers")
            save_papers_to_json(papers)
        else:
            print("No papers found")
    else:
        print("Failed to fetch papers")

if __name__ == "__main__":
    main()
