import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { JobService } from '../../services/job.service';
import { CompanyService } from '../../services/company.service';
import { JobList } from '../job-list/job-list';
import { JobSearchInput } from '../job-search-input/job-search-input';
import { JobStats } from '../job-stats/job-stats';
import { CompanyCard } from '../company-card/company-card';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [JobList, JobSearchInput, JobStats, CompanyCard, AsyncPipe, CommonModule],
  templateUrl: './jobs-page.html',
  styleUrl: './jobs-page.scss'
})
export class JobsPageComponent implements OnInit {
  jobService: JobService = inject(JobService);
  companyService: CompanyService = inject(CompanyService);

  ngOnInit() {
    this.jobService.loadJobs();
    this.companyService.loadCompanies();
  }

  searchTerm = signal<string>('');
  selectedIndustry = signal('all');

  jobResultString = computed(() => {
    const jobCount = this.filteredJobs().length;
    return `${jobCount} Job${jobCount > 1 ? 's' : ''}`;
  });

  onSearch(searchString: string) {
    this.searchTerm.set(searchString);
    this.jobService.searchJobs(searchString);
  }

  onJobDeleted(id: string) {
    this.jobService.deleteJob(id);
  }

  filteredJobs = computed(() => {
    return this.jobService.getFilteredJobs(this.searchTerm());
  });

  statsFoundJobsString = computed(() => {
    return this.jobResultString() + ' in your search';
  });

  companiesSignal = this.companyService.companies;
}
