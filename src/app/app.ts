import {Component, computed, signal} from '@angular/core';
import { JobCard } from '../components/job-card/job-card'
import {CompanyCard} from '../components/company-card/company-card';

@Component({
  selector: 'app-root',
  imports: [JobCard, CompanyCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly appTitle = signal('Job Board');

  searchTerm = signal<string>('');

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  filteredJobs = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    return this.jobs().filter(job => job.title.toLowerCase().includes(searchTerm));
  })

  foundJobsString = computed(() => {
    return `${this.filteredJobs().length} Job${this.filteredJobs().length > 1 ? 's' : ''} found`
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
