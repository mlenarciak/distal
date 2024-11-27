import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Users, 
  Briefcase, 
  LogIn, 
  LogOut, 
  ChevronDown, 
  CreditCard, 
  User,
  Building2,
  FolderKanban,
  Plus,
  Heart,
  Settings2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, userProfile, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const isResearcher = userProfile?.type === 'researcher';

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] bg-clip-text text-transparent flex items-center">
          <Database className="mr-2 text-[#250030]" />
          Distal
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/datasets" className="flex items-center text-gray-600 hover:text-[#250030] transition duration-200">
            <Database className="mr-1" size={18} />
            Datasets
          </Link>
          <Link to="/researchers" className="flex items-center text-gray-600 hover:text-[#250030] transition duration-200">
            <Users className="mr-1" size={18} />
            Researchers
          </Link>
          <Link to="/jobs" className="flex items-center text-gray-600 hover:text-[#250030] transition duration-200">
            <Briefcase className="mr-1" size={18} />
            Jobs
          </Link>
          
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
              >
                {userProfile?.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt={userProfile.firstName}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#250030] text-white flex items-center justify-center">
                    {userProfile?.firstName?.[0] || user.email?.[0]}
                  </div>
                )}
                <span>{userProfile?.firstName || 'Profile'}</span>
                <ChevronDown size={16} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  {/* Manage Section */}
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Manage</h3>
                  </div>
                  {isResearcher && (
                    <>
                      <Link
                        to="/datasets/new"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <Plus size={18} className="mr-2" />
                        Add Dataset
                      </Link>
                      <Link
                        to="/repositories/new"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        <Building2 size={18} className="mr-2" />
                        Add Repository
                      </Link>
                    </>
                  )}
                  <Link
                    to="/projects"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FolderKanban size={18} className="mr-2" />
                    My Projects
                  </Link>
                  <Link
                    to="/favorites"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Heart size={18} className="mr-2" />
                    Saved Datasets
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Settings Section */}
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
                  </div>
                  <Link
                    to="/settings/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User size={18} className="mr-2" />
                    Profile Settings
                  </Link>
                  <Link
                    to="/settings/billing"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <CreditCard size={18} className="mr-2" />
                    Billing & Payments
                  </Link>
                  <Link
                    to="/settings/preferences"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Settings2 size={18} className="mr-2" />
                    Preferences
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="flex items-center text-gray-600 hover:text-blue-600 transition duration-200">
                <LogIn className="mr-1" size={18} />
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] text-white px-4 py-2 rounded-md hover:from-[#3A005C] hover:via-[#6A1B8C] hover:to-[#7B1FA2] transition-all duration-300 shadow-lg hover:shadow-xl">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;