import { inject, Injectable, signal } from '@angular/core';
import { Industry, Job } from '../../utils/ts-utils';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  finalize,
  map,
  of,
  shareReplay,
  Subject,
  switchMap,
  tap
} from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor() {
    this.jobsSignal.set(this.defaultJobs());
  }
  private toastService = inject(ToastService);
  private jobsSignal = signal<Job[]>([])
  readonly jobs = this.jobsSignal.asReadonly();

  private creatingJobSignal = signal<boolean>(false);
  readonly creatingJobs = this.creatingJobSignal.asReadonly();

  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<null | string>(null);
  private deletingSignal = signal<boolean>(false);

  private errorType = signal<'network' | 'validation' | 'server' | null>(null)

  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly deleting = this.deletingSignal.asReadonly();

  private http = inject(HttpClient);

  private searchTermSubject = new Subject<string>();
  $searchResult = this.searchTermSubject.asObservable()
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(
        (searchTerm: string) => {
          return this.http.get<Job[]>(`http://localhost:3000/jobs`).pipe(
            map((jobs: Job[]) => {
              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              return jobs.filter(job => job.title.toLowerCase().includes(lowerCaseSearchTerm));
            })
          );
        }
      ),
      shareReplay(1)
    )

  searchJobs(searchTerm: string) {
    this.searchTermSubject.next(searchTerm)
  }

  loadJobs() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Job[]>('http://localhost:3000/jobs')
      .pipe(
        tap((jobs: Job[]) => this.jobsSignal.set(jobs)),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 0) {
            this.errorType.set('network');
          } else if (err.status === 400) {
            this.errorType.set('validation');
          } else if (err.status >= 500) {
            this.errorType.set('server');
          }
            this.errorSignal.set(`Error fetching jobs. Status: ${ err.status } Error: ${ err.message }`);
            return of([]);
          }
        ),
        finalize(() => this.loadingSignal.set(false))
      )
      .subscribe();
  }

  addJobToServer(job: Job) {
    this.creatingJobSignal.set(true);
    this.errorSignal.set(null);

    this.http.post<Job>('http://localhost:3000/jobs', job)
      .pipe(
        tap((newJob: Job) => {
          this.addJob(newJob);
          this.toastService.success('Job successfully created!', 4000);
        }),
        catchError((err: HttpErrorResponse) => {
          this.errorSignal.set(`Error posting job. Status: ${ err.status } Error: ${ err.message }`);
          this.toastService.error('Failed to create job!');
          return EMPTY;
        }),
        finalize(() => this.creatingJobSignal.set(false))
      )
      .subscribe();
  }

  deleteJob(id: string) {
    this.errorSignal.set(null);
    this.deletingSignal.set(true);

    this.http.delete<void>(`http://localhost:3000/jobs/${ id }`)
      .pipe(
        tap(() => {
          this.removeJob(id);
          this.toastService.success('Successfully deleted job!');
        }),
        catchError((err: HttpErrorResponse) => {
          this.errorSignal.set(`Error deleting job. Status: ${ err.status } Error: ${ err.message }`);
          this.toastService.error('Failed to delete job!');
          return EMPTY;
        }),
        finalize(() => this.deletingSignal.set(false))
      )
      .subscribe();
  }

  private static readonly DEFAULT_JOB_IDS = {
    job1: 'senior-angular-dev-001',
    job2: 'backend-engineer-002',
    job3: 'healthcare-it-003',
    job4: 'hr-manager-004',
    job5: 'financial-analyst-005'
  };


  private defaultJobs(): Job[] {
    return [
      {
        id: JobService.DEFAULT_JOB_IDS.job1,
        title: 'Senior Angular Developer',
        company: 'Google',
        industry: Industry.Technology,
        description: 'We are looking for an experienced Angular developer to join our team',
        salary: 150000
      },
      {
        id: JobService.DEFAULT_JOB_IDS.job2,
        title: 'Backend Engineer',
        company: 'Microsoft',
        industry: Industry.Technology,
        description: 'Build scalable backend systems with Node.js and TypeScript',
        salary: 140000
      },
      {
        id: JobService.DEFAULT_JOB_IDS.job3,
        title: 'Healthcare IT Specialist',
        company: 'CVS Health',
        industry: Industry.Medicine,
        description: 'Support and maintain critical healthcare information systems',
        salary: 90000
      },
      {
        id: JobService.DEFAULT_JOB_IDS.job4,
        title: 'HR Manager',
        company: 'Adobe',
        industry: Industry.HR,
        description: 'Lead HR initiatives and build high-performing teams',
        salary: 120000
      },
      {
        id: JobService.DEFAULT_JOB_IDS.job5,
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

  getJobById(id: string) {
    return this.http.get<Job>(`http://localhost:3000/jobs/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        throw new Error(`Job with ID ${id} not found. Status: ${err.status}`);
      })
    );
  }
}
