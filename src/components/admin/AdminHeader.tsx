import React from 'react';
import { Bell, User } from 'lucide-react';

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@researchhub.com</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;