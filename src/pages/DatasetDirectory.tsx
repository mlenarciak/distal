import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Database, Plus, Building2, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MapView from '../components/Map';

interface Archive {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  description: string;
  datasets: Dataset[];
}

interface Dataset {
  id: string;
  title: string;
  creator: string;
  size: string;
  description: string;
  tags: string[];
  archiveId: string;
}

const DatasetDirectory: React.FC = () => {
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArchive, setSelectedArchive] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock data - Replace with Firebase data
  const archives: Archive[] = [
    {
      id: '1',
      name: 'National Archives',
      location: 'Washington, DC',
      coordinates: { lat: 38.8947, lng: -77.0281 },
      description: 'The official archives of the United States government',
      datasets: [
        {
          id: '1',
          title: 'Census Records 1900-1950',
          creator: 'US Census Bureau',
          size: '2.3 GB',
          description: 'Digitized census records from the first half of the 20th century',
          tags: ['census', 'demographics', 'historical'],
          archiveId: '1'
        }
      ]
    }
  ];

  const allTags = Array.from(
    new Set(
      archives.flatMap(archive => 
        archive.datasets.flatMap(dataset => dataset.tags)
      )
    )
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredArchives = archives.filter(archive => {
    const matchesSearch = 
      archive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      archive.datasets.some(dataset => 
        dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dataset Directory</h1>
        {userProfile?.type === 'researcher' && (
          <Link
            to="/datasets/new"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <Plus size={20} className="mr-2" />
            Add Dataset
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
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`flex items-center px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map and Results */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <MapView
              locations={filteredArchives.map(archive => ({
                id: archive.id,
                name: archive.name,
                coordinates: archive.coordinates
              }))}
              onMarkerClick={setSelectedArchive}
            />
          </div>

          <div className="space-y-8">
            {filteredArchives.map(archive => (
              <div
                key={archive.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  selectedArchive === archive.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold flex items-center">
                        <Building2 className="mr-2 text-blue-600" size={24} />
                        {archive.name}
                      </h2>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin size={16} className="mr-1" />
                        {archive.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{archive.description}</p>

                  <div className="space-y-4">
                    {archive.datasets.map(dataset => (
                      <Link
                        key={dataset.id}
                        to={`/datasets/${dataset.id}`}
                        className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold flex items-center">
                              <Database size={16} className="mr-2 text-blue-600" />
                              {dataset.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Created by {dataset.creator} • {dataset.size}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              {dataset.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {dataset.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDirectory;