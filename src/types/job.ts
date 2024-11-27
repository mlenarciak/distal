export type JobStatus = 
  | 'discussion'   // Initial discussion phase
  | 'quoted'       // Provider has submitted a quote
  | 'accepted'     // Client has accepted the quote
  | 'in_progress'  // Work has started
  | 'review'       // Deliverables submitted for review
  | 'completed'    // Job completed
  | 'cancelled';   // Job cancelled

export type ProposalStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export type MilestoneStatus =
  | 'pending'
  | 'in_progress'
  | 'delivered'
  | 'approved'
  | 'rejected';

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  status: JobStatus;
  client_id: string;
  provider_id?: string;
  requirements: string;
  delivery_format: string;
  timeline: string;
  escrow_id?: string;
  completion_date?: string;
  created_at: string;
  updated_at: string;
}

export interface JobProposal {
  id: string;
  job_id: string;
  provider_id: string;
  price: number;
  timeline: string;
  approach: string;
  status: ProposalStatus;
  created_at: string;
}

export interface JobMilestone {
  id: string;
  job_id: string;
  title: string;
  description: string;
  due_date: string;
  price: number;
  status: MilestoneStatus;
  deliverables: string;
  feedback?: string;
  created_at: string;
  completed_at?: string;
}

export interface JobDeliverable {
  id: string;
  job_id: string;
  milestone_id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  status: MilestoneStatus;
  feedback?: string;
  created_at: string;
}