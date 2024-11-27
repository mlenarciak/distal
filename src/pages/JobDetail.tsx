import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JobDiscussion from '../components/job/JobDiscussion';
import JobProposal from '../components/job/JobProposal';
import JobMilestones from '../components/job/JobMilestones';
import JobDeliverables from '../components/job/JobDeliverables';
import { Job, JobProposal as IJobProposal } from '../types/job';
import { Briefcase, Clock, DollarSign, MapPin, FileText } from 'lucide-react';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [proposals, setProposals] = useState<IJobProposal[]>([]);
  const [activeTab, setActiveTab] = useState<'discussion' | 'proposal' | 'milestones' | 'deliverables'>('discussion');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    };

    const fetchProposals = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}/proposals`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProposals(data);
      } catch (error) {
        console.error('Failed to fetch proposals:', error);
      }
    };

    fetchJobDetails();
    fetchProposals();
  }, [id, token]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const isClient = user?.id === job.client_id;
  const isProvider = user?.id === job.provider_id;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center">
            <DollarSign className="text-green-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Budget</p>
              <p className="font-semibold">${job.budget}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold">{job.location}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="text-purple-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Timeline</p>
              <p className="font-semibold">{job.timeline}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <FileText className="text-orange-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Format</p>
              <p className="font-semibold">{job.delivery_format}</p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p>{job.requirements}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('discussion')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'discussion'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Discussion
            </button>
            
            {(isProvider || job.status === 'quoted') && (
              <button
                onClick={() => setActiveTab('proposal')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'proposal'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Proposal
              </button>
            )}
            
            {job.status !== 'discussion' && (
              <button
                onClick={() => setActiveTab('milestones')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'milestones'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Milestones
              </button>
            )}
            
            {job.status === 'in_progress' && (
              <button
                onClick={() => setActiveTab('deliverables')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'deliverables'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Deliverables
              </button>
            )}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'discussion' && (
            <JobDiscussion jobId={job.id} />
          )}
          
          {activeTab === 'proposal' && (
            <JobProposal 
              jobId={job.id}
              proposals={proposals}
              isClient={isClient}
              isProvider={isProvider}
            />
          )}
          
          {activeTab === 'milestones' && (
            <JobMilestones 
              jobId={job.id}
              isClient={isClient}
              isProvider={isProvider}
            />
          )}
          
          {activeTab === 'deliverables' && (
            <JobDeliverables 
              jobId={job.id}
              isClient={isClient}
              isProvider={isProvider}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;