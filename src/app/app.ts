import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CompanyCard} from './components/company-card/company-card';
import {JobList} from './components/job-list/job-list';
import {JobSearchInput} from './components/job-search-input/job-search-input';
import {JobStats} from './components/job-stats/job-stats';
import {JobPostingForm} from './components/job-posting-form/job-posting-form';
import {Job} from '../utils/ts-utils';
import {JobService} from './services/job.service';
import {CompanyService} from './services/company.service';

@Component({
  selector: 'app-root',
  imports: [CompanyCard, JobList, JobSearchInput, JobStats, JobPostingForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  jobService: JobService = inject(JobService);
  companyService: CompanyService = inject(CompanyService);
  protected readonly appTitle = signal('Job Board');

  ngOnInit() {
    this.jobService.loadJobs();
    this.companyService.loadCompanies();
  }

  searchTerm = signal<string>('');

  selectedIndustry = signal('all');

  jobResultString = computed(() => {
    const jobCount = this.filteredJobs().length;
    return `${jobCount} Job${jobCount > 1 ? 's' : ''}`
  })

  onSearch(searchString: string) {
    this.searchTerm.set(searchString);
  }

  onJobSubmitted(job: Job) {
    this.jobService.addJob(job);
  }

  filteredJobs = computed(() => {
    return this.jobService.getFilteredJobs(this.searchTerm())
  })

  foundJobsString = computed(() => {
    return this.jobResultString() + ' found';
  })

  statsFoundJobsString = computed(() => {
    return this.jobResultString() + ' in your search';
  })

  companiesSignal = this.companyService.companies;
}
