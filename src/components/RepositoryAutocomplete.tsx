import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { searchRepositories, Repository } from '../lib/firebase/repositories';

interface RepositoryAutocompleteProps {
  value: string;
  onChange: (repository: Repository) => void;
}

const RepositoryAutocomplete: React.FC<RepositoryAutocompleteProps> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchRepositories(searchTerm);
        setSuggestions(results);
      } catch (error) {
        console.error('Failed to load suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(loadSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="relative">
      <Building2 className="absolute left-3 top-2.5 text-gray-400" size={18} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Search repositories..."
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          {suggestions.map((repository) => (
            <button
              key={repository.id}
              type="button"
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                onChange(repository);
                setSearchTerm(repository.name);
                setShowSuggestions(false);
              }}
            >
              <div className="font-medium">{repository.name}</div>
              <div className="text-sm text-gray-600">{repository.location}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepositoryAutocomplete;