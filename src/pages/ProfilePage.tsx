import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Mail, BookOpen, Calendar, Building, Github, Linkedin, Edit, Settings } from 'lucide-react';
import PaperCard from '../components/PaperCard';

// Mock user data
const userData = {
  id: '101',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  avatar: null,
  bio: 'Associate Professor of Computer Science specializing in Natural Language Processing and Machine Learning. My research focuses on developing efficient algorithms for language understanding and generation.',
  university: 'Stanford University',
  department: 'Computer Science',
  joinedDate: '2024-01-15',
  papers: [
    {
      id: '1',
      title: 'Advances in Deep Learning for Natural Language Processing',
      abstract: 'This paper explores recent advancements in deep learning techniques for natural language processing tasks, including transformer architectures and their applications in various domains.',
      author: {
        id: '101',
        name: 'Dr. Sarah Johnson'
      },
      category: 'AI/ML',
      publishedDate: '2025-03-15',
      likes: 128
    },
    {
      id: '5',
      title: 'Federated Learning for Privacy-Preserving AI',
      abstract: 'This paper presents a novel approach to federated learning that enhances privacy while maintaining model accuracy across distributed data sources.',
      author: {
        id: '101',
        name: 'Dr. Sarah Johnson'
      },
      category: 'AI/ML',
      publishedDate: '2025-03-01',
      likes: 76
    }
  ],
  followers: 156,
  following: 42,
  socialLinks: {
    github: 'https://github.com/sarahjohnson',
    linkedin: 'https://linkedin.com/in/sarahjohnson'
  }
};

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('papers');
  
  // In a real app, you would fetch the user data based on the ID
  const user = userData;
  const isOwnProfile = id === 'me' || id === user.id;
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-indigo-700 h-32 relative">
          {isOwnProfile && (
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full text-indigo-700 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-6">
            <div className="h-24 w-24 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-indigo-600">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full" />
              ) : (
                <User className="h-12 w-12" />
              )}
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1">
                <div className="flex items-center mr-4">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{user.university}</span>
                </div>
                <div className="flex items-center mr-4">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{user.department}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {!isOwnProfile && (
              <button className="mt-4 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Follow
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {/* Bio */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-700">{user.bio}</p>
                
                {isOwnProfile && (
                  <button className="mt-3 flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Bio
                  </button>
                )}
              </div>
              
              {/* Contact & Social */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact & Social</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <a href={`mailto:${user.email}`} className="text-indigo-600 hover:text-indigo-800">
                      {user.email}
                    </a>
                  </div>
                  
                  {user.socialLinks.github && (
                    <div className="flex items-center">
                      <Github className="h-5 w-5 text-gray-500 mr-2" />
                      <a 
                        href={user.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        GitHub Profile
                      </a>
                    </div>
                  )}
                  
                  {user.socialLinks.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 text-gray-500 mr-2" />
                      <a 
                        href={user.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-2xl font-bold text-gray-900">{user.papers.length}</span>
                  <span className="text-sm text-gray-500">Papers</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-2xl font-bold text-gray-900">{user.followers}</span>
                  <span className="text-sm text-gray-500">Followers</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-2xl font-bold text-gray-900">{user.following}</span>
                  <span className="text-sm text-gray-500">Following</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('papers')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'papers'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Research Papers
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'activity'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Recent Activity
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              {activeTab === 'papers' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Published Papers ({user.papers.length})
                    </h2>
                    
                    {isOwnProfile && (
                      <Link 
                        to="/upload" 
                        className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Upload New Paper
                      </Link>
                    )}
                  </div>
                  
                  {user.papers.length > 0 ? (
                    <div className="space-y-6">
                      {user.papers.map(paper => (
                        <PaperCard key={paper.id} {...paper} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No papers yet</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {isOwnProfile 
                          ? "You haven't published any research papers yet. Upload your first paper to get started!"
                          : "This user hasn't published any research papers yet."}
                      </p>
                      
                      {isOwnProfile && (
                        <Link 
                          to="/upload" 
                          className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Upload Paper
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Feed Coming Soon</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We're working on an activity feed to show recent interactions, comments, and publications.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;