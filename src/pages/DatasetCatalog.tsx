import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const DatasetCatalog: React.FC = () => {
  const datasets = [
    { 
      id: 1, 
      title: "Historical Weather Patterns", 
      description: "Comprehensive weather data from 1900-2000", 
      price: "$99",
      image: "https://images.unsplash.com/photo-1590055531615-6d51bd4ac5b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: 2, 
      title: "Rare Book Manuscripts", 
      description: "Digitized manuscripts from the 15th century", 
      price: "$149",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: 3, 
      title: "Global Trade Statistics", 
      description: "International trade data from 1950-2020", 
      price: "$199",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dataset Catalog</h1>
      
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder="Search datasets..."
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
          <option>Sort by: Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map(dataset => (
          <div key={dataset.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={dataset.image}
              alt={dataset.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{dataset.title}</h2>
              <p className="text-gray-600 mb-4">{dataset.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">{dataset.price}</span>
                <Link
                  to={`/datasets/${dataset.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatasetCatalog;