import {inject, Injectable, signal} from '@angular/core';
import {Industry, Job} from '../../utils/ts-utils';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor() {
    this.jobsSignal.set(this.defaultJobs());
  }

  private jobsSignal = signal<Job[]>([])
  readonly jobs = this.jobsSignal.asReadonly();

  private creatingJobSignal = signal<boolean>(false);
  readonly creatingJobs = this.creatingJobSignal.asReadonly();

  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<null | string>(null);

  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  private http = inject(HttpClient);

  loadJobs() {
   this.loadingSignal.set(true);
   this.errorSignal.set(null);

   this.http.get<Job[]>('http://localhost:3000/jobs')
     .pipe(finalize(() => {
       this.loadingSignal.set(false);
     }))
     .subscribe({
     next: (jobs: Job[]) =>  this.jobsSignal.set(jobs),
     error: (err: HttpErrorResponse) => this.errorSignal
       .set(`Error fetching jobs. Status: ${err.status} Error: ${err.message}`)
   })
  }

  addJobToServer(job: Job) {
    this.creatingJobSignal.set(true);
    this.errorSignal.set(null);

    this.http.post<Job>('http://localhost:3000/jobs', job)
      .pipe(
        finalize(() => this.creatingJobSignal.set(false))
      )
      .subscribe({
        next: (newJob: Job) => this.addJob(newJob),
        error: (error: HttpErrorResponse) => {
          this.errorSignal.set(`Error posting job. Status: ${error.status} Error: ${error.message}`)
        }
      })
  }

  deleteJob(id: string) {
    this.errorSignal.set(null);

    this.http.delete<void>(`http://localhost:3000/jobs/${id}`)
      .subscribe({
        next: () => {
          this.removeJob(id);
        },
        error: (error: HttpErrorResponse) => {
          this.errorSignal.set(`Error deleting job. Status: ${error.status} Error: ${error.message}`)
        }
      })
  }

  private defaultJobs(): Job[] {
    return [
      {
        id: crypto.randomUUID(),
        title: 'Senior Angular Developer',
        company: 'Google',
        industry: Industry.Technology,
        description: 'We are looking for an experienced Angular developer to join our team',
        salary: 150000
      },
      {
        id: crypto.randomUUID(),
        title: 'Backend Engineer',
        company: 'Microsoft',
        industry: Industry.Technology,
        description: 'Build scalable backend systems with Node.js and TypeScript',
        salary: 140000
      },
      {
        id: crypto.randomUUID(),
        title: 'Healthcare IT Specialist',
        company: 'CVS Health',
        industry: Industry.Medicine,
        description: 'Support and maintain critical healthcare information systems',
        salary: 90000
      },
      {
        id: crypto.randomUUID(),
        title: 'HR Manager',
        company: 'Adobe',
        industry: Industry.HR,
        description: 'Lead HR initiatives and build high-performing teams',
        salary: 120000
      },
      {
        id: crypto.randomUUID(),
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
      return [...currentJobs, job]
    })
  }

  removeJob(deletedJobId: string) {
    this.jobsSignal.update(currentJobs => {
      return currentJobs.filter(job => job.id !== deletedJobId);
    })
  }

  getFilteredJobs(searchTerm: string): Job[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return this.jobs().filter(job => job.title.toLowerCase().includes(lowerCaseSearchTerm));
  }
}
