import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Building, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Mock data for users
const allUsers = [
  {
    id: '101',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    university: 'Stanford University',
    department: 'Computer Science',
    joinedDate: '2024-01-15',
    papers: 2,
    isActive: true
  },
  {
    id: '102',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@mit.edu',
    university: 'MIT',
    department: 'Electrical Engineering',
    joinedDate: '2024-01-20',
    papers: 1,
    isActive: true
  },
  {
    id: '103',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@caltech.edu',
    university: 'Caltech',
    department: 'Physics',
    joinedDate: '2024-02-05',
    papers: 1,
    isActive: true
  },
  {
    id: '104',
    name: 'Prof. David Kim',
    email: 'david.kim@jhu.edu',
    university: 'Johns Hopkins University',
    department: 'Biomedical Engineering',
    joinedDate: '2024-02-10',
    papers: 1,
    isActive: true
  },
  {
    id: '105',
    name: 'Dr. Lisa Wang',
    email: 'lisa.wang@cmu.edu',
    university: 'Carnegie Mellon University',
    department: 'Computer Science',
    joinedDate: '2024-02-15',
    papers: 1,
    isActive: false
  },
  {
    id: '106',
    name: 'Prof. James Wilson',
    email: 'james.wilson@washington.edu',
    university: 'University of Washington',
    department: 'Information Systems',
    joinedDate: '2024-02-20',
    papers: 2,
    isActive: true
  },
  {
    id: '107',
    name: 'Dr. Robert Taylor',
    email: 'robert.taylor@berkeley.edu',
    university: 'UC Berkeley',
    department: 'Data Science',
    joinedDate: '2024-03-01',
    papers: 0,
    isActive: true
  },
  {
    id: '108',
    name: 'Prof. Jennifer Lee',
    email: 'jennifer.lee@harvard.edu',
    university: 'Harvard University',
    department: 'Computer Science',
    joinedDate: '2024-03-05',
    papers: 0,
    isActive: false
  }
];

const AdminUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState(allUsers);
  
  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    // Search query filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is already handled by the filteredUsers variable
  };
  
  const toggleUserStatus = (userId: string) => {
    // In a real app, this would call your API to update the user status
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-600">View and manage all registered users on the platform.</p>
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
                placeholder="Search users by name, email, university, or department..."
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
                <option value="all">All Users</option>
                <option value="active">Active Users</option>
                <option value="inactive">Inactive Users</option>
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
      
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Registered Users ({filteredUsers.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University & Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papers
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.university}</div>
                    <div className="text-sm text-gray-500">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.papers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isActive ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link 
                        to={`/admin/users/${user.id}`} 
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Profile"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      
                      <Link 
                        to={`/admin/users/${user.id}/edit`} 
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit User"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={user.isActive ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                        title={user.isActive ? "Deactivate User" : "Activate User"}
                      >
                        {user.isActive ? <XCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                      </button>
                      
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="Delete User"
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
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No users match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;