import React from 'react';
import { Search, Filter, MapPin, DollarSign } from 'lucide-react';

const JobListings: React.FC = () => {
  // Mock data for demonstration
  const jobs = [
    { id: 1, title: "Digitize Ancient Manuscripts", location: "Remote", budget: "$500 - $1000", description: "We need help digitizing a collection of ancient manuscripts from the 12th century." },
    { id: 2, title: "Data Entry for Historical Census", location: "New York, USA", budget: "$1000 - $2000", description: "Looking for someone to input data from historical census records into our database." },
    { id: 3, title: "Transcribe Audio Interviews", location: "Remote", budget: "$300 - $600", description: "Transcription needed for a series of oral history interviews about local folklore." },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
          <Search className="inline-block" size={18} />
        </button>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <button className="flex items-center text-gray-600 hover:text-blue-600">
          <Filter className="mr-2" size={18} />
          Filter
        </button>
        <select className="px-4 py-2 rounded-md border border-gray-300">
          <option>Sort by: Newest First</option>
          <option>Budget: High to Low</option>
          <option>Budget: Low to High</option>
        </select>
      </div>
      
      <div className="space-y-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="mr-2" size={18} />
              {job.location}
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <DollarSign className="mr-2" size={18} />
              {job.budget}
            </div>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;