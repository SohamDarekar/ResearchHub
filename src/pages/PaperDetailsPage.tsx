import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, ThumbsUp, MessageSquare, Share2, User, Calendar, BookOpen, Building, Tag } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for a research paper
const paperData = {
  id: '1',
  title: 'Advances in Deep Learning for Natural Language Processing',
  abstract: 'This paper explores recent advancements in deep learning techniques for natural language processing tasks, including transformer architectures and their applications in various domains. We present a comprehensive review of state-of-the-art models and their performance on benchmark datasets, as well as novel approaches to improve efficiency and accuracy. Our findings suggest that hybrid architectures combining attention mechanisms with recurrent neural networks offer promising results for complex language understanding tasks.',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
  authors: [
    { id: '101', name: 'Dr. Sarah Johnson', university: 'Stanford University' },
    { id: '102', name: 'Prof. Michael Chen', university: 'MIT' }
  ],
  university: 'Stanford University',
  field: 'AI/ML',
  keywords: ['deep learning', 'natural language processing', 'transformer', 'attention mechanisms'],
  publishedDate: '2025-03-15',
  likes: 128,
  downloads: 356,
  pdfUrl: '#',
  comments: [
    {
      id: '1',
      user: { id: '201', name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      content: 'Great paper! The comparison between different transformer architectures was particularly insightful.',
      date: '2025-03-18',
      likes: 12
    },
    {
      id: '2',
      user: { id: '202', name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      content: 'I would be interested to see how these approaches perform on low-resource languages. Have you considered extending your research in that direction?',
      date: '2025-03-20',
      likes: 8
    }
  ]
};

const PaperDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  
  // In a real app, you would fetch the paper data based on the ID
  const paper = paperData;
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, you would send this to your API
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };
  
  const handleLike = () => {
    setLiked(!liked);
    // In a real app, you would update the like count on your server
  };
  
  const handleDownload = () => {
    // In a real app, this would trigger the download
    console.log('Downloading paper:', paper.id);
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Paper Header */}
        <div className="bg-indigo-700 px-6 py-4">
          <div className="flex justify-between items-start">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-white text-indigo-800 rounded-full">
              {paper.field}
            </span>
            <div className="flex items-center text-white text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(new Date(paper.publishedDate), 'MMM d, yyyy')}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">{paper.title}</h1>
        </div>
        
        {/* Paper Content */}
        <div className="p-6">
          {/* Authors */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-2">AUTHORS</h2>
            <div className="flex flex-wrap gap-4">
              {paper.authors.map(author => (
                <div key={author.id} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.university}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Abstract */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Abstract</h2>
            <p className="text-gray-700">{paper.abstract}</p>
          </div>
          
          {/* Paper Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-start mb-3">
                <BookOpen className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Field</h3>
                  <p className="text-gray-900">{paper.field}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-3">
                <Building className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">University</h3>
                  <p className="text-gray-900">{paper.university}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-start mb-3">
                <Tag className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Keywords</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {paper.keywords.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center text-gray-500 mr-4">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>{paper.likes} likes</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Download className="h-5 w-5 mr-1" />
                  <span>{paper.downloads} downloads</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </button>
            
            <button
              onClick={handleLike}
              className={`flex items-center px-4 py-2 rounded-md ${
                liked 
                  ? 'bg-pink-100 text-pink-700 border border-pink-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="h-5 w-5 mr-2" />
              {liked ? 'Liked' : 'Like'}
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
          
          {/* PDF Preview (placeholder) */}
          <div className="mb-8 border border-gray-300 rounded-lg p-4 bg-gray-50 h-64 flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-4">PDF Preview</p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Download className="h-5 w-5 mr-2" />
                Download to View
              </button>
            </div>
          </div>
          
          {/* Comments Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Comments ({paper.comments.length})
            </h2>
            
            {/* New Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  disabled={!newComment.trim()}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Post Comment
                </button>
              </div>
            </form>
            
            {/* Comments List */}
            <div className="space-y-6">
              {paper.comments.map(comment => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-900">{comment.user.name}</h3>
                        <span className="text-xs text-gray-500">
                          {format(new Date(comment.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <button className="flex items-center hover:text-indigo-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {comment.likes} likes
                      </button>
                      <span className="mx-2">•</span>
                      <button className="hover:text-indigo-600">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailsPage;