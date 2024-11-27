import React from 'react';
import { Star, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Providers: React.FC = () => {
  const providers = [
    {
      id: 1,
      name: "Digital Archives Pro",
      specialty: "Historical Manuscripts",
      rating: 4.9,
      completedJobs: 156,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      verified: true
    },
    {
      id: 2,
      name: "DataScan Solutions",
      specialty: "Government Records",
      rating: 4.8,
      completedJobs: 98,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      verified: true
    },
    {
      id: 3,
      name: "Heritage Data Corp",
      specialty: "Archaeological Data",
      rating: 4.7,
      completedJobs: 73,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      verified: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Our Trusted Providers
        </h1>
        <p className="text-gray-600 text-lg">
          Meet our verified data providers who bring historical records to life
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold">{provider.name}</h3>
                    {provider.verified && (
                      <Shield className="w-5 h-5 text-blue-600 ml-2" />
                    )}
                  </div>
                  <p className="text-gray-600">{provider.specialty}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{provider.rating}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-blue-600 mr-1" />
                  <span>{provider.completedJobs} jobs completed</span>
                </div>
              </div>

              <Link 
                to={`/providers/${provider.id}`}
                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 text-center"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;