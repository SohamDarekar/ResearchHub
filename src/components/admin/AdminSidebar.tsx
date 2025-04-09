import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  BookOpen
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/papers', icon: <FileText size={20} />, label: 'Research Papers' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="bg-indigo-800 text-white w-64 flex flex-col h-full">
      <div className="p-4 border-b border-indigo-700">
        <Link to="/admin" className="flex items-center">
          <BookOpen className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  isActive(item.path)
                    ? 'bg-indigo-700 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-indigo-700">
        <Link to="/" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded">
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;