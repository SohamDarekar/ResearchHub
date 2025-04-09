import axios from 'axios';

export interface Author {
  id: string;
  name: string;
}

export interface SearchResult {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  publicationDate: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  timeFrame?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

class SearchService {
  async search(query: string): Promise<SearchResult[]> {
    // Mock implementation - replace with actual API call
    return [
      {
        id: '1',
        title: 'Example Research Paper',
        authors: ['John Doe', 'Jane Smith'],
        abstract: 'This is a sample abstract for the research paper...',
        publicationDate: '2023-01-01'
      }
    ];
  }
}

export const searchService = new SearchService();
