import React from 'react';
import { Briefcase, Database, MessageSquare, DollarSign } from 'lucide-react';

const UserDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Briefcase className="text-blue-600 mb-2" size={24} />
          <h2 className="text-xl font-semibold mb-1">Active Jobs</h2>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Database className="text-green-600 mb-2" size={24} />
          <h2 className="text-xl font-semibold mb-1">Datasets</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <MessageSquare className="text-yellow-600 mb-2" size={24} />
          <h2 className="text-xl font-semibold mb-1">Messages</h2>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DollarSign className="text-purple-600 mb-2" size={24} />
          <h2 className="text-xl font-semibold mb-1">Earnings</h2>
          <p className="text-3xl font-bold">$1,250</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Jobs</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Digitize Ancient Manuscripts</span>
              <span className="text-blue-600">In Progress</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Transcribe Audio Interviews</span>
              <span className="text-green-600">Completed</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Data Entry for Historical Census</span>
              <span className="text-yellow-600">Pending</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Datasets</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Historical Weather Patterns</span>
              <span className="text-green-600">Published</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Rare Book Manuscripts</span>
              <span className="text-blue-600">In Review</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Global Trade Statistics</span>
              <span className="text-green-600">Published</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;