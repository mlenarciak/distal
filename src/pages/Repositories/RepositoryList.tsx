import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Search, Filter, MapPin, Plus } from 'lucide-react';
import MapView from '../../components/Map';
import { useAuth } from '../../context/AuthContext';

const RepositoryList: React.FC = () => {
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'university' | 'government' | 'private'>('all');
  const [selectedRepository, setSelectedRepository] = useState<string | null>(null);

  // Mock data - Replace with Firebase data
  const repositories = [
    {
      id: '1',
      name: 'American Heritage Center',
      type: 'university',
      location: 'Laramie, WY',
      coordinates: { lat: 41.3149, lng: -105.5666 },
      description: 'University of Wyoming\'s repository of manuscript collections',
      collections: ['Western History', 'Political Papers']
    },
    {
      id: '2',
      name: 'National Archives',
      type: 'government',
      location: 'Washington, DC',
      coordinates: { lat: 38.8947, lng: -77.0281 },
      description: 'Official archives of the United States government',
      collections: ['Government Records', 'Historical Documents']
    }
  ];

  const filteredRepositories = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || repo.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Repositories</h1>
        {userProfile?.type === 'researcher' && (
          <Link
            to="/repositories/new"
            className="flex items-center bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] text-white px-4 py-2 rounded-lg hover:from-[#3A005C] hover:via-[#6A1B8C] hover:to-[#7B1FA2] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} className="mr-2" />
            Add Repository
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Search and Filters */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#250030]"
              />
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Type</h3>
              <div className="space-y-2">
                {['all', 'university', 'government', 'private'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type as any)}
                      className="mr-2"
                    />
                    <span className="capitalize">{type === 'all' ? 'All Types' : type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map and Results */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <MapView
              locations={filteredRepositories.map(repo => ({
                id: repo.id,
                name: repo.name,
                coordinates: repo.coordinates
              }))}
              onMarkerClick={setSelectedRepository}
            />
          </div>

          <div className="space-y-6">
            {filteredRepositories.map(repository => (
              <Link
                key={repository.id}
                to={`/repositories/${repository.id}`}
                className={`block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  selectedRepository === repository.id ? 'ring-2 ring-[#250030]' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Building2 className="text-[#250030] mr-3" size={24} />
                    <div>
                      <h2 className="text-xl font-semibold">{repository.name}</h2>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin size={16} className="mr-1" />
                        {repository.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{repository.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {repository.collections.map((collection, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-[#250030] px-3 py-1 rounded-full text-sm"
                      >
                        {collection}
                      </span>
                    ))}
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

export default RepositoryList;