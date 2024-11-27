import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Globe, Mail, Phone, Save } from 'lucide-react';

interface RepositoryFormData {
  name: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
    website: string;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
}

const RepositoryForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<RepositoryFormData>({
    name: '',
    description: '',
    location: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    contact: {
      address: '',
      email: '',
      phone: '',
      website: ''
    },
    hours: {
      weekday: '',
      weekend: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement Firebase save
      navigate('/repositories');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save repository');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Repository</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repository Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lat}
                  onChange={(e) => setFormData({
                    ...formData,
                    coordinates: {
                      ...formData.coordinates,
                      lat: parseFloat(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lng}
                  onChange={(e) => setFormData({
                    ...formData,
                    coordinates: {
                      ...formData.coordinates,
                      lng: parseFloat(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                  required
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, address: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value }
                      })}
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={formData.contact.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value }
                      })}
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="url"
                      value={formData.contact.website}
                      onChange={(e) => setFormData({
                        ...formData,
                        contact: { ...formData.contact, website: e.target.value }
                      })}
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                      placeholder="https://"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Hours of Operation</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weekday Hours
                  </label>
                  <input
                    type="text"
                    value={formData.hours.weekday}
                    onChange={(e) => setFormData({
                      ...formData,
                      hours: { ...formData.hours, weekday: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                    placeholder="e.g., Monday - Friday, 9:00 AM - 5:00 PM"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weekend Hours
                  </label>
                  <input
                    type="text"
                    value={formData.hours.weekend}
                    onChange={(e) => setFormData({
                      ...formData,
                      hours: { ...formData.hours, weekend: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#250030]"
                    placeholder="e.g., Saturday - Sunday, Closed"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center bg-gradient-to-br from-[#4A0072] via-[#7B1FA2] to-[#9C27B0] text-white px-6 py-2 rounded-lg hover:from-[#3A005C] hover:via-[#6A1B8C] hover:to-[#7B1FA2] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <Save size={20} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save Repository'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RepositoryForm;