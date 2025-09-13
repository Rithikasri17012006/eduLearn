import React from 'react';
import { BookOpen, Home, LogOut, User } from 'lucide-react';

interface NavbarProps {
  onBackToDashboard: () => void;
  onLogout: () => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onBackToDashboard, onLogout, currentPage }) => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EduLearn</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {currentPage !== 'dashboard' && (
              <button
                onClick={onBackToDashboard}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                <span className="hidden sm:block">Dashboard</span>
              </button>
            )}
            
            <div className="flex items-center px-3 py-2 text-gray-600">
              <User className="h-4 w-4 mr-1" />
              <span className="hidden sm:block">Demo User</span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;