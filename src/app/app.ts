import { Component, signal } from '@angular/core';
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
