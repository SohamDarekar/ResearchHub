import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

interface SearchResult {
  id: string;
  title: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setIsLoading(true);
      // Implement your search logic here
      // This is just a placeholder
      const dummyResults = [
        { id: '1', title: 'Sample Research Paper 1' },
        { id: '2', title: 'Sample Research Paper 2' },
      ];
      setResults(dummyResults);
      setIsLoading(false);
    } else {
      setResults([]);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search research papers..."
        value={query}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      {(results.length > 0 || isLoading) && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div className={styles.noResults}>Loading...</div>
          ) : (
            results.map((result) => (
              <div key={result.id} className={styles.dropdownItem}>
                {result.title}
              </div>
            ))
          )}
          {!isLoading && results.length === 0 && query.length > 2 && (
            <div className={styles.noResults}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
