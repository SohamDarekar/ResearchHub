import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, BookOpen, Upload, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Mock authentication state - in a real app, this would come from your auth context
  const isAuthenticated = false;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">ResearchHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search papers..."
                className="py-1 pl-3 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search className="h-5 w-5" />
              </button>
            </form>

            <Link to="/upload" className="hover:bg-indigo-600 px-3 py-2 rounded-md flex items-center">
              <Upload className="h-5 w-5 mr-1" />
              <span>Upload</span>
            </Link>

            {isAuthenticated ? (
              <Link to="/profile/me" className="hover:bg-indigo-600 px-3 py-2 rounded-md flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link to="/login" className="hover:bg-indigo-600 px-3 py-2 rounded-md flex items-center">
                <LogIn className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 pb-3 px-4">
          <form onSubmit={handleSearch} className="mt-3 relative">
            <input
              type="text"
              placeholder="Search papers..."
              className="w-full py-2 pl-3 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-3 space-y-1">
            <Link 
              to="/upload" 
              className="block px-3 py-2 rounded-md text-white hover:bg-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Paper
            </Link>
            
            {isAuthenticated ? (
              <Link 
                to="/profile/me" 
                className="block px-3 py-2 rounded-md text-white hover:bg-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-white hover:bg-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;