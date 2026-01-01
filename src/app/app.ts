import {Component, computed, signal} from '@angular/core';
import {CompanyCard} from './components/company-card/company-card';
import {JobList} from './components/job-list/job-list';
import {JobSearchInput} from './components/job-search-input/job-search-input';
import {JobStats} from './components/job-stats/job-stats';
import {JobPostingForm} from './components/job-posting-form/job-posting-form';
import {Industry, Job} from '../utils/ts-utils';

@Component({
  selector: 'app-root',
  imports: [CompanyCard, JobList, JobSearchInput, JobStats, JobPostingForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly appTitle = signal('Job Board');

  searchTerm = signal<string>('');

  selectedIndustry = signal('all');

  jobResultString = computed(() => {
    return `${this.filteredJobs().length} Job${this.filteredJobs().length > 1 ? 's' : ''}`
  })

  onSearch(searchString: string) {
    this.searchTerm.set(searchString);
  }

  onJobSubmitted(job: Job) {
    this.jobs.update(currentJobs => {
      return [job, ...currentJobs]
    })
  }

  filteredJobs = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    return this.jobs().filter(job => job.title.toLowerCase().includes(searchTerm));
  })

  foundJobsString = computed(() => {
    return this.jobResultString() + ' found';
  })

  statsFoundJobsString = computed(() => {
    return this.jobResultString() + ' in your search';
  })


  jobs = signal<Job[]>([
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
  ]);

  companies = signal([
    {companyName: 'Rocken', industry: 'HR', employeeCount: 200},
    {companyName: 'FinFox', industry: 'Finance', employeeCount: 999},
    {companyName: 'Apple', industry: 'Consumer Electronics', employeeCount: 4876}
  ])
}
