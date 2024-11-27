import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Building2, User2 } from 'lucide-react';
import MapView from '../components/Map';

interface Researcher {
  id: string;
  name: string;
  type: 'individual' | 'organization';
  tagline: string;
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  jobsCompleted: number;
  image: string;
  services: string[];
  archives: string[];
}

const ResearcherSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'individual' | 'organization'>('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedResearcher, setSelectedResearcher] = useState<string | null>(null);
  
  // Mock data - In production, fetch from Firebase
  const researchers: Researcher[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      type: 'individual',
      tagline: 'Specializing in historical manuscript digitization',
      location: 'New York, USA',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      rating: 4.9,
      jobsCompleted: 156,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      services: ['digitization', 'annotation', 'transcription'],
      archives: ['National Archives', 'NY Public Library']
    },
    {
      id: '2',
      name: 'Heritage Digital Solutions',
      type: 'organization',
      tagline: 'Professional archive digitization services',
      location: 'London, UK',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      rating: 4.8,
      jobsCompleted: 342,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      services: ['digitization', 'preservation', 'consulting'],
      archives: ['British Library', 'National Maritime Museum']
    }
  ];

  const services = ['digitization', 'annotation', 'transcription', 'preservation', 'consulting'];

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const filteredResearchers = researchers.filter(researcher => {
    const matchesSearch = researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         researcher.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || researcher.type === selectedType;
    const matchesServices = selectedServices.length === 0 ||
                           selectedServices.every(service => researcher.services.includes(service));
    return matchesSearch && matchesType && matchesServices;
  });

  const handleMarkerClick = (id: string) => {
    setSelectedResearcher(id);
    const element = document.getElementById(`researcher-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Search and Filters */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search researchers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedType === 'all'}
                    onChange={() => setSelectedType('all')}
                    className="mr-2"
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedType === 'individual'}
                    onChange={() => setSelectedType('individual')}
                    className="mr-2"
                  />
                  <User2 className="mr-2" size={16} />
                  <span>Individual Researchers</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedType === 'organization'}
                    onChange={() => setSelectedType('organization')}
                    className="mr-2"
                  />
                  <Building2 className="mr-2" size={16} />
                  <span>Organizations</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Services</h3>
              <div className="space-y-2">
                {services.map(service => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => toggleService(service)}
                      className="mr-2"
                    />
                    <span className="capitalize">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results and Map */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <MapView
              locations={filteredResearchers.map(r => ({
                id: r.id,
                name: r.name,
                coordinates: r.coordinates
              }))}
              onMarkerClick={handleMarkerClick}
            />
          </div>

          <div className="space-y-6">
            {filteredResearchers.map(researcher => (
              <Link
                key={researcher.id}
                id={`researcher-${researcher.id}`}
                to={`/researchers/${researcher.id}`}
                className={`block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  selectedResearcher === researcher.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="p-6 flex items-start space-x-4">
                  <img
                    src={researcher.image}
                    alt={researcher.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold">{researcher.name}</h3>
                      {researcher.type === 'organization' && (
                        <Building2 className="ml-2 text-blue-600" size={20} />
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{researcher.tagline}</p>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin size={16} className="mr-1" />
                      {researcher.location}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span>{researcher.rating}</span>
                      </div>
                      <span className="text-gray-500">{researcher.jobsCompleted} jobs completed</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherSearch;