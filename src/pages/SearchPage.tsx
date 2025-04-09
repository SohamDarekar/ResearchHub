import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import PaperCard from '../components/PaperCard';
import HomeSearchBar from '../components/HomeSearchBar';
import { searchService } from '../services/searchService';
import type { SearchResult } from '../services/searchService';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchService.search(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to perform search');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeSearchBar 
            onSearchStart={() => setIsLoading(true)}
            onSearchComplete={(results) => {
              setSearchResults(results);
              setIsLoading(false);
            }}
            initialQuery={searchParams.get('q') || ''}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="text-red-600 mb-4" role="alert">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results {searchResults.length > 0 && `(${searchResults.length})`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((paper) => (
                <PaperCard key={paper.id} {...paper} />
              ))}
              {searchResults.length === 0 && !isLoading && searchParams.get('q') && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No results found for "{searchParams.get('q')}"
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;