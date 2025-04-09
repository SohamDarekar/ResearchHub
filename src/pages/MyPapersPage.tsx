import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { FileText, Edit, Trash2, Eye, Loader } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

interface Paper {
  id: string;
  title: string;
  abstract: string;
  status: 'draft' | 'published' | 'under_review';
  createdAt: string;
}

const MyPapersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, 'papers'),
          where('authorId', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const paperData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Paper[];
        
        setPapers(paperData);
      } catch (error) {
        console.error('Error fetching papers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Papers</h1>
          <Link
            to="/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FileText className="h-5 w-5 mr-2" />
            Upload New Paper
          </Link>
        </div>

        {papers.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No papers</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading your research paper.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {papers.map((paper) => (
                <li key={paper.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {paper.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {paper.abstract.substring(0, 150)}...
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="capitalize">{paper.status.replace('_', ' ')}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(paper.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Link
                        to={`/papers/${paper.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/papers/${paper.id}/edit`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPapersPage;
