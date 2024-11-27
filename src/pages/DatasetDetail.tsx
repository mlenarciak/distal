import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  FileText, 
  Globe, 
  Heart, 
  Info, 
  Languages, 
  Lock,
  Plus,
  Tag,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DatasetDetail: React.FC = () => {
  const { id } = useParams();
  const { userProfile } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - Replace with Firebase data
  const dataset = {
    id,
    title: "Census Records 1900-1950",
    creator: "US Census Bureau",
    dates: "1900-1950",
    quantity: "500,000 records",
    collectionNumber: "RG 29",
    url: "https://archives.gov/census-1900-1950",
    summary: "Complete set of digitized census records covering the first half of the 20th century.",
    repository: "National Archives",
    accessRestrictions: "Public Domain",
    languages: ["English"],
    historicalNote: "These records represent a comprehensive demographic snapshot of the United States during a period of significant growth and change.",
    contentDescription: "Contains detailed population statistics including names, ages, occupations, and places of birth for all US residents.",
    useOfCollection: "Genealogical research, demographic studies, historical analysis",
    administrativeInfo: "Digitized between 2018-2020 under the National Digitization Project",
    detailedDescription: "The collection includes both handwritten census forms and typed summary reports...",
    mainContent: "Population schedules, enumeration district maps, and statistical compilations",
    tags: ["census", "demographics", "historical", "genealogy"]
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Update Firebase with favorite status
  };

  const addToProject = () => {
    // Implement add to project functionality
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold">{dataset.title}</h1>
            <div className="flex space-x-4">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart fill={isFavorite ? "currentColor" : "none"} size={20} />
              </button>
              <button
                onClick={addToProject}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Add to Project
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <User className="text-gray-400 mr-3" size={20} />
              <div>
                <div className="text-sm text-gray-600">Creator</div>
                <div className="font-medium">{dataset.creator}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="text-gray-400 mr-3" size={20} />
              <div>
                <div className="text-sm text-gray-600">Dates</div>
                <div className="font-medium">{dataset.dates}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Building2 className="text-gray-400 mr-3" size={20} />
              <div>
                <div className="text-sm text-gray-600">Repository</div>
                <div className="font-medium">{dataset.repository}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Lock className="text-gray-400 mr-3" size={20} />
              <div>
                <div className="text-sm text-gray-600">Access</div>
                <div className="font-medium">{dataset.accessRestrictions}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Info className="mr-2" size={20} />
                Summary
              </h2>
              <p className="text-gray-700">{dataset.summary}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="mr-2" size={20} />
                Content Description
              </h2>
              <p className="text-gray-700">{dataset.contentDescription}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Globe className="mr-2" size={20} />
                Use of Collection
              </h2>
              <p className="text-gray-700">{dataset.useOfCollection}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Languages className="mr-2" size={20} />
                Languages
              </h2>
              <div className="flex gap-2">
                {dataset.languages.map(language => (
                  <span
                    key={language}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Tag className="mr-2" size={20} />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {dataset.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail;