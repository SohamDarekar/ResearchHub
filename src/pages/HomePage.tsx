import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Upload, Users, Filter, FileText, Loader } from 'lucide-react';
import PaperCard from '../components/PaperCard';
import HomeSearchBar from '../components/HomeSearchBar';
import { getFeaturedPapers, getPaperCount } from '../services/paperService';
import type { SearchResult } from '../services/searchService';

type PaperCategory = 'all' | 'ai-ml' | 'blockchain' | 'biomedical' | 'quantum-computing';

type SearchResult = {
  id: string;
  title: string;
  author: string;
  institution?: string;
  abstract: string;
  publicationDate: string;
  category: string;
  downloadUrl: string;
};

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<PaperCategory>('all');
  const [featuredPapers, setFeaturedPapers] = useState<SearchResult[]>([]);
  const [paperCount, setPaperCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [papers, count] = await Promise.all([
          getFeaturedPapers(selectedCategory),
          getPaperCount()
        ]);

        setFeaturedPapers(papers);

        if (typeof count !== 'number' || isNaN(count)) {
          throw new Error('Invalid paper count received');
        }

        setPaperCount(count);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setFeaturedPapers([]);
        setPaperCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setIsSearching(true);
      setSearchLoading(true);
      handleSearch(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchService.search(query);
      setSearchResults(results);
      setIsSearching(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as PaperCategory);
  };

  const handleSearchStart = () => {
    setIsSearching(true);
    setSearchLoading(true);
  };

  const handleSearchComplete = (results: SearchResult[]) => {
    setSearchResults(results);
    setSearchLoading(false);
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600" role="alert">
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen" role="status">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-indigo-600 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Research Papers
            </h1>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Search through thousands of peer-reviewed papers, books, and publications
            </p>
            
            <HomeSearchBar 
              onSearchStart={handleSearchStart}
              onSearchComplete={handleSearchComplete}
              initialQuery={searchParams.get('q') || ''}
            />
            
            {isSearching && (
              <button
                onClick={handleClearSearch}
                className="mt-4 text-gray-600 hover:text-gray-800"
              >
                Clear Search
              </button>
            )}
            
            {!isSearching && (
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/upload" className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Paper
                </Link>
                <Link to="/register" className="bg-white text-indigo-700 hover:bg-indigo-100 px-6 py-3 rounded-lg font-medium flex items-center border-2 border-white">
                  <Users className="h-5 w-5 mr-2" />
                  Join Community
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSearching ? (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Search Results</h2>
            {searchLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map((paper) => (
                  <PaperCard key={paper.id} {...paper} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Featured Papers</h2>
                <div className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-gray-600" aria-hidden="true" />
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Select paper category"
                  >
                    <option value="all">All Categories</option>
                    <option value="ai-ml">AI/ML</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="biomedical">Biomedical</option>
                    <option value="quantum-computing">Quantum Computing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPapers.map((paper) => (
                  <PaperCard key={paper.id} {...paper} />
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link to={`/search${searchParams.toString() ? `?${searchParams.toString()}` : ''}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                  <span className="font-medium">View all papers</span>
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-10 bg-white text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800">Total Research Papers</h2>
              <div className="flex items-center justify-center text-indigo-700 text-6xl font-extrabold mt-4">
                <FileText className="h-12 w-12 mr-3" />
                {paperCount === null ? '...' : paperCount.toLocaleString()}
              </div>
              <p className="text-gray-600 mt-2">Papers uploaded on ResearchHub</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
