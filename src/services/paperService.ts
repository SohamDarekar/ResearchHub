import type { SearchResult } from './searchService';

// Mock data
const mockPapers: SearchResult[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    authors: ['John Doe', 'Jane Smith'], // Ensure authors are correctly defined
    abstract: 'A comprehensive overview of machine learning fundamentals.',
    category: 'ai-ml',
    publishedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Blockchain Technology Overview',
    authors: ['Alice Johnson'], // Ensure authors are correctly defined
    abstract: 'Understanding the basics of blockchain technology.',
    category: 'blockchain',
    publishedDate: '2024-02-01',
  },
  // Add more mock papers as needed
  {
    id: '9',
    title: 'Machine Learning in Climate Science',
    abstract: 'Exploring applications of ML algorithms in climate prediction and modeling...',
    authors: ['Dr. Thomas Green'], // Ensure authors are correctly defined
    publishedDate: '2023-12-10',
    category: 'ai-ml'
  },
  {
    id: '10',
    title: 'Quantum Entanglement in Computing',
    abstract: 'New discoveries in quantum entanglement and their implications for quantum computing...',
    authors: ['Prof. Maria Santos'], // Ensure authors are correctly defined
    publishedDate: '2023-12-05',
    category: 'quantum-computing'
  },
  {
    id: '11',
    title: 'Blockchain in Digital Identity',
    abstract: 'Implementing secure digital identity systems using blockchain technology...',
    authors: ['Dr. Kevin Park'], // Ensure authors are correctly defined
    publishedDate: '2023-12-01',
    category: 'blockchain'
  },
  {
    id: '12',
    title: 'Advances in Regenerative Medicine',
    abstract: 'Latest developments in stem cell research and tissue engineering...',
    authors: ['Dr. Sarah Mitchell'], // Ensure authors are correctly defined
    publishedDate: '2023-11-28',
    category: 'biomedical'
  },
  {
    id: '13',
    title: 'Artificial Intelligence in Healthcare',
    abstract: 'Examining the role of AI in modern healthcare systems and patient care...',
    authors: ['Dr. Emily Carter'], // Ensure authors are correctly defined
    publishedDate: '2023-11-20',
    category: 'ai-ml'
  },
  {
    id: '14',
    title: 'Cybersecurity Trends in 2024',
    abstract: 'An analysis of emerging threats and solutions in the field of cybersecurity...',
    authors: ['Dr. Michael Brown'], // Ensure authors are correctly defined
    publishedDate: '2023-11-15',
    category: 'cybersecurity'
  }
];

export const getFeaturedPapers = async (category: string): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const papers = category === 'all' 
    ? mockPapers 
    : mockPapers.filter(paper => paper.category === category);
    
  return papers.map(paper => ({
    ...paper,
    authors: paper.authors?.length ? paper.authors : ['Unknown Author']
  }));
};

export const getPaperCount = async (): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return 157842;
};
