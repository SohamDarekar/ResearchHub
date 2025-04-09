import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  BarChart2, 
  Download
} from 'lucide-react';

// Mock data for dashboard stats
const stats = [
  { name: 'Total Papers', value: '156', icon: <FileText className="h-6 w-6 text-indigo-600" /> },
  { name: 'Registered Users', value: '2,451', icon: <Users className="h-6 w-6 text-green-600" /> },
  { name: 'Pending Approvals', value: '24', icon: <Clock className="h-6 w-6 text-amber-600" /> },
  { name: 'Plagiarism Alerts', value: '7', icon: <AlertTriangle className="h-6 w-6 text-red-600" /> }
];

// Mock data for recent submissions
const recentSubmissions = [
  {
    id: '1',
    title: 'Quantum Machine Learning for Financial Forecasting',
    author: 'Dr. James Wilson',
    university: 'MIT',
    submittedDate: '2025-03-20',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Blockchain-Based Framework for Secure Health Records',
    author: 'Prof. Lisa Chen',
    university: 'Stanford University',
    submittedDate: '2025-03-19',
    status: 'plagiarism_check'
  },
  {
    id: '3',
    title: 'Neural Networks for Climate Prediction Models',
    author: 'Dr. Michael Brown',
    university: 'UC Berkeley',
    submittedDate: '2025-03-18',
    status: 'approved'
  },
  {
    id: '4',
    title: 'Biomedical Applications of Graphene Nanoparticles',
    author: 'Prof. Sarah Johnson',
    university: 'Harvard University',
    submittedDate: '2025-03-17',
    status: 'rejected'
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
          <AlertTriangle className="h-3 w-3 mr-1" />
          Rejected
        </span>
      );
    default:
      return null;
  }
};

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin. Here's what's happening with your research platform.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Submissions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paper
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                        <Link to={`/admin/papers/${submission.id}`}>
                          {submission.title}
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500">{submission.university}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submittedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(submission.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <Link 
              to="/admin/papers" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
            >
              View all papers →
            </Link>
          </div>
        </div>
        
        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <Link 
                to="/admin/papers?status=pending" 
                className="flex items-center p-3 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100"
              >
                <Clock className="h-5 w-5 mr-3" />
                <span>Review Pending Papers</span>
              </Link>
              <Link 
                to="/admin/papers?status=plagiarism" 
                className="flex items-center p-3 bg-red-50 text-red-700 rounded-md hover:bg-red-100"
              >
                <AlertTriangle className="h-5 w-5 mr-3" />
                <span>Check Plagiarism Alerts</span>
              </Link>
              <Link 
                to="/admin/users" 
                className="flex items-center p-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Manage Users</span>
              </Link>
            </div>
          </div>
          
          {/* Download Stats */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Download Statistics</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">1,248</p>
                  <p className="text-sm text-gray-500">Total Downloads This Month</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">AI/ML</span>
                  <span className="text-sm font-medium text-gray-900">542</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">Blockchain</span>
                  <span className="text-sm font-medium text-gray-900">356</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">Biomedical</span>
                  <span className="text-sm font-medium text-gray-900">214</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">Quantum Computing</span>
                  <span className="text-sm font-medium text-gray-900">136</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link 
                  to="/admin/reports" 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center"
                >
                  <BarChart2 className="h-4 w-4 mr-1" />
                  View detailed reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;