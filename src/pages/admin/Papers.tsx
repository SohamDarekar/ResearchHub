import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText,
  Eye,
  Trash2
} from 'lucide-react';

// Mock data for papers
const allPapers = [
  {
    id: '1',
    title: 'Quantum Machine Learning for Financial Forecasting',
    author: 'Dr. James Wilson',
    university: 'MIT',
    field: 'Quantum Computing',
    submittedDate: '2025-03-20',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Blockchain-Based Framework for Secure Health Records',
    author: 'Prof. Lisa Chen',
    university: 'Stanford University',
    field: 'Blockchain',
    submittedDate: '2025-03-19',
    status: 'plagiarism_check'
  },
  {
    id: '3',
    title: 'Neural Networks for Climate Prediction Models',
    author: 'Dr. Michael Brown',
    university: 'UC Berkeley',
    field: 'AI/ML',
    submittedDate: '2025-03-18',
    status: 'approved'
  },
  {
    id: '4',
    title: 'Biomedical Applications of Graphene Nanoparticles',
    author: 'Prof. Sarah Johnson',
    university: 'Harvard University',
    field: 'Biomedical',
    submittedDate: '2025-03-17',
    status: 'rejected'
  },
  {
    id: '5',
    title: 'Federated Learning for Privacy-Preserving AI',
    author: 'Dr. Lisa Wang',
    university: 'Carnegie Mellon University',
    field: 'AI/ML',
    submittedDate: '2025-03-16',
    status: 'approved'
  },
  {
    id: '6',
    title: 'Smart Contracts for Supply Chain Management',
    author: 'Prof. James Wilson',
    university: 'University of Washington',
    field: 'Blockchain',
    submittedDate: '2025-03-15',
    status: 'approved'
  },
  {
    id: '7',
    title: 'Quantum Cryptography: Practical Applications',
    author: 'Dr. Emily Rodriguez',
    university: 'Caltech',
    field: 'Quantum Computing',
    submittedDate: '2025-03-14',
    status: 'pending'
  },
  {
    id: '8',
    title: 'Novel Drug Delivery Systems Using Nanomaterials',
    author: 'Prof. David Kim',
    university: 'Johns Hopkins University',
    field: 'Biomedical',
    submittedDate: '2025-03-13',
    status: 'plagiarism_check'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </span>
      );
    case 'plagiarism_check':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Plagiarism Check
        </span>
      );
    case 'approved':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </span>
      );
    default:
      return null;
  }
};

const AdminPapers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [papers, setPapers] = useState(allPapers);
  
  // Filter papers based on search and filters
  const filteredPapers = papers.filter(paper => {
    // Search query filter
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.university.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || paper.status === statusFilter;
    
    // Field filter
    const matchesField = fieldFilter === 'all' || paper.field === fieldFilter;
    
    return matchesSearch && matchesStatus && matchesField;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is already handled by the filteredPapers variable
  };
  
  const handleStatusChange = (paperId: string, newStatus: string) => {
    // In a real app, this would call your API to update the paper status
    setPapers(papers.map(paper => 
      paper.id === paperId ? { ...paper, status: newStatus } : paper
    ));
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Research Papers</h1>
        <p className="text-gray-600">Review, approve, and manage all submitted research papers.</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search papers by title, author, or university..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="plagiarism_check">Plagiarism Check</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="w-full md:w-48">
              <select
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Fields</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Biomedical">Biomedical</option>
                <option value="Quantum Computing">Quantum Computing</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </form>
        </div>
      </div>
      
      {/* Papers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Research Papers ({filteredPapers.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paper
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author & University
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Field
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                          <Link to={`/admin/papers/${paper.id}`}>
                            {paper.title}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{paper.author}</div>
                    <div className="text-sm text-gray-500">{paper.university}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {paper.field}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(paper.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(paper.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link 
                        to={`/admin/papers/${paper.id}`} 
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      
                      <button 
                        onClick={() => handleStatusChange(paper.id, 'approved')}
                        className="text-green-600 hover:text-green-900"
                        title="Approve"
                        disabled={paper.status === 'approved'}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      
                      <button 
                        onClick={() => handleStatusChange(paper.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                        title="Reject"
                        disabled={paper.status === 'rejected'}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                      
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No research papers match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPapers;