import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl">ResearchHub</span>
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              A platform for researchers to share and discover academic papers across various fields.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/search?category=ai-ml" className="text-gray-300 hover:text-white">AI/ML</Link></li>
              <li><Link to="/search?category=blockchain" className="text-gray-300 hover:text-white">Blockchain</Link></li>
              <li><Link to="/search?category=biomedical" className="text-gray-300 hover:text-white">Biomedical</Link></li>
              <li><Link to="/search?category=quantum-computing" className="text-gray-300 hover:text-white">Quantum Computing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/guidelines" className="text-gray-300 hover:text-white">Submission Guidelines</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="mailto:contact@researchhub.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://github.com/researchhub" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/researchhub" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              Subscribe to our newsletter for updates on new papers and features.
            </p>
            <form className="mt-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ResearchHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;