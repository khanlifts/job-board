import {Component, computed, signal} from '@angular/core';
import {CompanyCard} from '../components/company-card/company-card';
import {JobList} from '../components/job-list/job-list';
import {JobSearchInput} from '../components/job-search-input/job-search-input';
import {JobStats} from '../components/job-stats/job-stats';

@Component({
  selector: 'app-root',
  imports: [CompanyCard, JobList, JobSearchInput, JobStats],
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

  jobs = signal([
    {title: 'Backend Dev', company: 'Amazon'},
    {title: 'Senior Frontend Dev', company: 'Apple'}
  ])

  companies = signal([
    {companyName: 'Rocken', industry: 'HR', employeeCount: 200},
    {companyName: 'FinFox', industry: 'Finance', employeeCount: 999},
    {companyName: 'Apple', industry: 'Consumer Electronics', employeeCount: 4876}
  ])
}
