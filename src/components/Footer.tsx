import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Database, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#250030] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center text-2xl font-bold mb-4">
              <Database className="mr-2" />
              Distal
            </Link>
            <p className="text-gray-300 mb-4">
              Bridging the gap between data seekers and digitizers.
            </p>
            <div className="flex space-x-4">
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/datasets" className="text-gray-300 hover:text-white transition duration-200">
                  Dataset Directory
                </Link>
              </li>
              <li>
                <Link to="/researchers" className="text-gray-300 hover:text-white transition duration-200">
                  Find Researchers
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white transition duration-200">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/projects/new" className="text-gray-300 hover:text-white transition duration-200">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <a href="mailto:contact@distal.dev" className="hover:text-white transition duration-200">
                  contact@distal.dev
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Distal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;