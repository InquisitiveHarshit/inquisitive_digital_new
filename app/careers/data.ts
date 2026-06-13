export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Remote" | string;
  salary?: string;
  salary_range?: string | null;
  description: string;
  requirements: string[];
  is_active?: boolean;
  applications_count?: number;
}

export interface Application {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume_url: string;
  resume_original_name: string;
  status: "pending" | "shortlisted" | "rejected";
  applied_at: string;
}

export const mockJobs: Job[] = [];

export const mockApplications: Application[] = [];

export function getJobById(id: string): Job | undefined {
  return mockJobs.find((job) => job.id === id);
}
