import type { SearchResult } from './searchService';

// Mock data
const mockPapers: SearchResult[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    authors: ['John Doe', 'Jane Smith'],
    abstract: 'A comprehensive overview of machine learning fundamentals.',
    category: 'ai-ml',
    publishedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Blockchain Technology Overview',
    authors: ['Alice Johnson'],
    abstract: 'Understanding the basics of blockchain technology.',
    category: 'blockchain',
    publishedDate: '2024-02-01',
  },
  // Add more mock papers as needed
  {
    id: '9',
    title: 'Machine Learning in Climate Science',
    abstract: 'Exploring applications of ML algorithms in climate prediction and modeling...',
    authors: ['Dr. Thomas Green'],
    publishedDate: '2023-12-10',
    category: 'ai-ml'
  },
  {
    id: '10',
    title: 'Quantum Entanglement in Computing',
    abstract: 'New discoveries in quantum entanglement and their implications for quantum computing...',
    authors: ['Prof. Maria Santos'],
    publishedDate: '2023-12-05',
    category: 'quantum-computing'
  },
  {
    id: '11',
    title: 'Blockchain in Digital Identity',
    abstract: 'Implementing secure digital identity systems using blockchain technology...',
    authors: ['Dr. Kevin Park'],
    publishedDate: '2023-12-01',
    category: 'blockchain'
  },
  {
    id: '12',
    title: 'Advances in Regenerative Medicine',
    abstract: 'Latest developments in stem cell research and tissue engineering...',
    authors: ['Dr. Sarah Mitchell'],
    publishedDate: '2023-11-28',
    category: 'biomedical'
  }
];

export const getFeaturedPapers = async (category: string): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (category === 'all') {
    return mockPapers;
  }
  
  return mockPapers.filter(paper => paper.category === category);
};

export const getPaperCount = async (): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return 157842;
};
