import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Database, Users, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#250030] via-[#4d0060] to-[#750090] text-white py-16 mb-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Your complex projects, managed for you
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Let our certified project managers handle your data gathering needs end-to-end. 
              From strategic planning to delivery, we ensure quality results.
            </p>
            <Link 
              to="/projects/new" 
              className="inline-flex items-center bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3A005C] hover:via-[#6A1B8C] hover:to-[#7B1FA2] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Scope your project
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
        
        {/* Spline 3D Viewer */}
        <div className="absolute inset-0 w-full h-full">
          <spline-viewer url="https://prod.spline.design/8-zkjQZ6NtHnbMIe/scene.splinecode"></spline-viewer>
        </div>
      </div>

      {/* Search Section */}
      <div className="text-center mb-12">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for datasets or jobs..."
            className="w-full max-w-2xl px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#250030]"
          />
          <button className="mt-4 bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] text-white px-6 py-2 rounded-full hover:from-[#3A005C] hover:via-[#6A1B8C] hover:to-[#7B1FA2] transition-all duration-300 shadow-lg hover:shadow-xl">
            <Search className="inline-block mr-2" size={18} />
            Search
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Database className="mx-auto mb-4 text-[#250030]" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Find Datasets</h2>
          <p className="mb-4">Discover unique and hard-to-find datasets from archives worldwide.</p>
          <Link to="/datasets" className="text-[#250030] hover:underline">Browse Datasets</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="mx-auto mb-4 text-[#250030]" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Meet Researchers</h2>
          <p className="mb-4">Connect with expert researchers specializing in data digitization.</p>
          <Link to="/researchers" className="text-[#250030] hover:underline">Find Researchers</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Briefcase className="mx-auto mb-4 text-[#250030]" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Post a Job</h2>
          <p className="mb-4">Connect with skilled researchers to digitize the data you need.</p>
          <Link to="/post-job" className="text-[#250030] hover:underline">Post a Job</Link>
        </div>
      </div>

      {/* Project Management Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Take one of two routes to project success
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Strategic project planning</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="text-[#250030] mr-2" size={20} />
                  <span>Detailed project brief</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#250030] mr-2" size={20} />
                  <span>Selection of hand-picked freelance talent</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#250030] mr-2" size={20} />
                  <span>Execution plan with deliverables and timeline</span>
                </li>
              </ul>
              <Link
                to="/projects/new?type=planning"
                className="block text-center bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] text-white py-2 rounded-lg hover:from-[#3A005C] hover:via-[#6A1B8C] hover:to-[#7B1FA2] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Scope your project
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">End-to-end project management</h3>
              <p className="text-gray-600 mb-4">Everything included in strategic planning, plus:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="text-[#250030] mr-2" size={20} />
                  <span>Timeline tracking & status reports</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#250030] mr-2" size={20} />
                  <span>Team coordination and leadership</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#250030] mr-2" size={20} />
                  <span>Daily operations management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-[#250030] mr-2" size={20} />
                  <span>Assurance of quality deliverables</span>
                </li>
              </ul>
              <Link
                to="/projects/new?type=managed"
                className="block text-center bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] text-white py-2 rounded-lg hover:from-[#3A005C] hover:via-[#6A1B8C] hover:to-[#7B1FA2] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Kick off your project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;