import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ClipboardList, Calendar, DollarSign, FileText, Send } from 'lucide-react';

const NewProject: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectType = searchParams.get('type') || 'planning';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeline: '',
    budget: '',
    deliverables: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    navigate('/projects/confirmation');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        {projectType === 'managed' ? 'Start Your Managed Project' : 'Scope Your Project'}
      </h1>
      <p className="text-gray-600 mb-8">
        Tell us about your project and we'll help you get started with the right solution.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <div className="relative">
                <ClipboardList className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Historical Census Data Digitization"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                rows={4}
                placeholder="Describe your project, including the type of data you need digitized..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., 3 months"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., $5,000 - $10,000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Deliverables
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  placeholder="Describe the format and specifications of your desired output..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                rows={3}
                placeholder="Any other details that would help us understand your project better..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center bg-emerald-900 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition duration-200"
          >
            Submit Project Brief
            <Send className="ml-2" size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProject;