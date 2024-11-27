import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Building2, 
  Calendar, 
  FileText, 
  Tag,
  Save,
  Plus,
  X
} from 'lucide-react';

interface DatasetFormData {
  title: string;
  creator: string;
  dates: string;
  quantity: string;
  collectionNumber: string;
  url: string;
  summary: string;
  repository: string;
  accessRestrictions: string;
  languages: string[];
  historicalNote: string;
  contentDescription: string;
  useOfCollection: string;
  administrativeInfo: string;
  detailedDescription: string;
  mainContent: string;
  tags: string[];
}

const DatasetForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [newTag, setNewTag] = useState('');

  const [formData, setFormData] = useState<DatasetFormData>({
    title: '',
    creator: '',
    dates: '',
    quantity: '',
    collectionNumber: '',
    url: '',
    summary: '',
    repository: '',
    accessRestrictions: '',
    languages: [],
    historicalNote: '',
    contentDescription: '',
    useOfCollection: '',
    administrativeInfo: '',
    detailedDescription: '',
    mainContent: '',
    tags: []
  });

  useEffect(() => {
    const loadDataset = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'datasets', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data() as DatasetFormData);
          }
        } catch (error) {
          setError('Failed to load dataset');
        }
      }
    };

    loadDataset();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const datasetData = {
        ...formData,
        createdBy: user?.uid,
        updatedAt: new Date().toISOString(),
        ...(id ? {} : { createdAt: new Date().toISOString() })
      };

      if (id) {
        await updateDoc(doc(db, 'datasets', id), datasetData);
      } else {
        const docRef = doc(db, 'datasets');
        await setDoc(docRef, datasetData);
      }

      navigate('/datasets');
    } catch (error) {
      setError('Failed to save dataset');
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Dataset' : 'Add New Dataset'}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Creator
              </label>
              <input
                type="text"
                value={formData.creator}
                onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dates
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.dates}
                  onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repository
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.repository}
                  onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <textarea
                value={formData.contentDescription}
                onChange={(e) => setFormData({ ...formData, contentDescription: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center">
              <div className="relative flex-grow">
                <Tag className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag"
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={addTag}
                className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={20} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save Dataset'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DatasetForm;