import requests
import xml.etree.ElementTree as ET
import json
from datetime import datetime

# Configuration
ARXIV_API_URL = "http://export.arxiv.org/api/query"

# Multiple search topics - customize these as needed!
SEARCH_TOPICS = {
    'ai_ml': {
        'query': 'cat:cs.AI OR cat:cs.LG OR cat:cs.CV OR cat:cs.CL',
        'name': 'AI & Machine Learning',
        'max_results': 10
    },
    'causal': {
        'query': 'all:causal AND (cat:cs.AI OR cat:cs.LG OR cat:stat.ML)',
        'name': 'Causal Inference',
        'max_results': 10
    },
    'llm': {
        'query': 'all:"large language model" OR all:LLM OR all:GPT',
        'name': 'Large Language Models',
        'max_results': 5
    },
    'reinforcement': {
        'query': 'all:"reinforcement learning" OR all:RL',
        'name': 'Reinforcement Learning',
        'max_results': 5
    }
}

OUTPUT_FILE = "papers.json"

def fetch_arxiv_papers_by_topic(topic_query, max_results):
    """Fetch papers for a specific topic"""
    params = {
        'search_query': topic_query,
        'start': 0,
        'max_results': max_results,
        'sortBy': 'submittedDate',
        'sortOrder': 'descending'
    }
    
    try:
        response = requests.get(ARXIV_API_URL, params=params, timeout=30)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching papers for query '{topic_query}': {e}")
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
                'categories': category_list,
                'topic': ''  # Will be set by the fetcher
            }
            
            papers.append(paper)
        
        return papers
    
    except ET.ParseError as e:
        print(f"Error parsing XML: {e}")
        return []

def save_papers_to_json(papers, topics_info):
    """Save papers to JSON file"""
    data = {
        'lastUpdated': datetime.now().isoformat(),
        'topics': topics_info,
        'papers': papers
    }
    
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Successfully saved {len(papers)} papers to {OUTPUT_FILE}")
    except IOError as e:
        print(f"Error saving to file: {e}")

def main():
    print("Fetching latest arXiv papers from multiple topics...")
    print(f"Topics: {', '.join([info['name'] for info in SEARCH_TOPICS.values()])}\n")
    
    all_papers = []
    topics_info = {}
    
    # Fetch papers for each topic
    for topic_id, topic_config in SEARCH_TOPICS.items():
        print(f"Fetching {topic_config['name']}...")
        xml_data = fetch_arxiv_papers_by_topic(
            topic_config['query'], 
            topic_config['max_results']
        )
        
        if xml_data:
            papers = parse_arxiv_response(xml_data)
            
            # Add topic information to each paper
            for paper in papers:
                paper['topic'] = topic_config['name']
            
            all_papers.extend(papers)
            topics_info[topic_id] = {
                'name': topic_config['name'],
                'count': len(papers)
            }
            print(f"  ✓ Found {len(papers)} papers\n")
        else:
            print(f"  ✗ Failed to fetch papers\n")
    
    if all_papers:
        # Remove duplicates (same arXiv ID)
        seen_ids = set()
        unique_papers = []
        for paper in all_papers:
            paper_id = paper['link']
            if paper_id not in seen_ids:
                seen_ids.add(paper_id)
                unique_papers.append(paper)
        
        print(f"Total unique papers: {len(unique_papers)}")
        save_papers_to_json(unique_papers, topics_info)
    else:
        print("No papers found from any topic")

if __name__ == "__main__":
    main()
