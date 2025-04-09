import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Calendar, User, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';

interface Author {
  id: string;
  name: string;
}

interface PaperCardProps {
  id: string;
  title: string;
  abstract?: string;
  author?: Author;
  category: string;
  publishedDate?: string;
  likes: number;
}

const PaperCard: React.FC<PaperCardProps> = ({
  id,
  title,
  abstract,
  author,
  category,
  publishedDate,
  likes,
}) => {
  const date = publishedDate ? new Date(publishedDate) : null;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date ? format(date, 'MMM d, yyyy') : 'Unknown Date'}</span>
          </div>
        </div>
        
        <Link to={`/papers/${id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition-colors duration-200">
            {title}
          </h3>
        </Link>
        
        {abstract && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {abstract}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          {author ? (
            <Link to={`/profile/${author.id}`} className="flex items-center text-gray-700 hover:text-indigo-600">
              <User className="h-4 w-4 mr-1" />
              <span className="text-sm">{author.name}</span>
            </Link>
          ) : (
            <span className="text-sm text-gray-700">Unknown Author</span>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-gray-500">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="text-sm">{likes}</span>
            </div>
            
            <Link 
              to={`/papers/${id}`} 
              className="flex items-center text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded"
            >
              <Download className="h-4 w-4 mr-1" />
              <span>Download</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;