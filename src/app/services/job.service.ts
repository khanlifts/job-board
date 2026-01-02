import {Injectable, signal} from '@angular/core';
import {Industry, Job} from '../../utils/ts-utils';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor() {
    this.jobsSignal.set(this.defaultJobs());
  }

  private jobsSignal = signal<Job[]>([])
  private jobs = this.jobsSignal.asReadonly();

  private defaultJobs(): Job[] {
    return [
      {
        title: 'Senior Angular Developer',
        company: 'Google',
        industry: Industry.Technology,
        description: 'We are looking for an experienced Angular developer to join our team',
        salary: 150000
      },
      {
        title: 'Backend Engineer',
        company: 'Microsoft',
        industry: Industry.Technology,
        description: 'Build scalable backend systems with Node.js and TypeScript',
        salary: 140000
      },
      {
        title: 'Healthcare IT Specialist',
        company: 'CVS Health',
        industry: Industry.Medicine,
        description: 'Support and maintain critical healthcare information systems',
        salary: 90000
      },
      {
        title: 'HR Manager',
        company: 'Adobe',
        industry: Industry.HR,
        description: 'Lead HR initiatives and build high-performing teams',
        salary: 120000
      },
      {
        title: 'Financial Analyst',
        company: 'Goldman Sachs',
        industry: Industry.Finance,
        description: 'Analyze financial data and provide strategic insights',
        salary: 130000
      }
    ]
  }

  addJob(job: Job) {
    this.jobsSignal.update(currentJobs => {
      return [job, ...currentJobs]
    })
  }

  getFilteredJobs(searchTerm: string): Job[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return this.jobs().filter(job => job.title.toLowerCase().includes(lowerCaseSearchTerm));
  }
}
