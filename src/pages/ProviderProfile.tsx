import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Calendar, Award, Shield, Briefcase, Clock, CheckCircle } from 'lucide-react';

const ProviderProfile: React.FC = () => {
  const { id } = useParams();

  // Mock data - In production, fetch from API using id
  const provider = {
    name: "Digital Archives Pro",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 4.9,
    location: "New York, USA",
    joinedDate: "January 2022",
    completedJobs: 156,
    verified: true,
    specialties: ["Historical Manuscripts", "Government Records", "Academic Papers"],
    description: "Digital Archives Pro specializes in the digitization of historical documents and manuscripts. With over 5 years of experience, we've helped numerous institutions preserve their valuable archives.",
    recentProjects: [
      { title: "Medieval Manuscript Collection", status: "Completed", date: "March 2024" },
      { title: "City Council Records 1950-1960", status: "In Progress", date: "April 2024" },
      { title: "University Research Papers", status: "Completed", date: "February 2024" }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-2xl font-bold mr-2">{provider.name}</h1>
                {provider.verified && (
                  <Shield className="text-blue-600" size={20} />
                )}
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {provider.location}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Joined {provider.joinedDate}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Star className="mx-auto mb-2 text-yellow-400" size={24} />
              <div className="font-bold text-xl">{provider.rating}</div>
              <div className="text-gray-600">Rating</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Briefcase className="mx-auto mb-2 text-blue-600" size={24} />
              <div className="font-bold text-xl">{provider.completedJobs}</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Award className="mx-auto mb-2 text-green-600" size={24} />
              <div className="font-bold text-xl">100%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-700">{provider.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Recent Projects</h2>
            <div className="space-y-4">
              {provider.recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-1" />
                      {project.date}
                    </div>
                  </div>
                  <span className={`flex items-center ${
                    project.status === 'Completed' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    <CheckCircle size={16} className="mr-1" />
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;