import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2, 
  Clock, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  FileText,
  Database,
  Calendar,
  Users,
  BookOpen,
  Archive,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const RepositoryDetail: React.FC = () => {
  const { id } = useParams();

  // Mock data - Replace with Firebase data
  const repository = {
    name: "American Heritage Center",
    description: "The American Heritage Center (AHC) is the University of Wyoming's repository of manuscript collections, rare books, and university archives.",
    location: "Laramie, WY 82071",
    contact: {
      address: "2111 Willet Drive",
      email: "ahcref@uwyo.edu",
      phone: "(307) 766-3756",
      website: "https://www.uwyo.edu/ahc"
    },
    hours: {
      weekday: "Monday - Friday, 9:00 a.m. - 5:00 p.m. MT",
      weekend: "Closed on weekends"
    },
    collections: [
      "Western History Archives",
      "Political Papers",
      "Native American Collections",
      "Transportation History"
    ],
    services: [
      "Research Assistance",
      "Digital Scanning",
      "Reference Services",
      "Educational Programs"
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Building2 className="mr-2 text-blue-600" size={28} />
                {repository.name}
              </h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin size={18} className="mr-1" />
                {repository.location}
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700">{repository.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="mr-2 text-blue-600" size={20} />
                Hours of Operation
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">{repository.hours.weekday}</p>
                <p className="text-gray-700">{repository.hours.weekend}</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="mr-2 text-blue-600" size={20} />
                Contact Information
              </h2>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <MapPin className="mr-2" size={16} />
                  {repository.contact.address}
                </p>
                <p className="flex items-center text-gray-700">
                  <Mail className="mr-2" size={16} />
                  <a href={`mailto:${repository.contact.email}`} className="text-blue-600 hover:underline">
                    {repository.contact.email}
                  </a>
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="mr-2" size={16} />
                  {repository.contact.phone}
                </p>
                <p className="flex items-center text-gray-700">
                  <Globe className="mr-2" size={16} />
                  <a href={repository.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    Visit Website
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Archive className="mr-2 text-blue-600" size={20} />
                Collections
              </h2>
              <ul className="space-y-2">
                {repository.collections.map((collection, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <BookOpen className="mr-2" size={16} />
                    {collection}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="mr-2 text-blue-600" size={20} />
                Services
              </h2>
              <ul className="space-y-2">
                {repository.services.map((service, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="mr-2" size={16} />
                    {service}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;