import {inject, Injectable, signal} from '@angular/core';
import {Company} from '../../utils/ts-utils';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor() {
    this.companiesSignal.set(this.defaultCompanies())
  }

  private http = inject(HttpClient);

  private companiesSignal = signal<Company[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  readonly companies = this.companiesSignal.asReadonly()

  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  loadCompanies() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Company[]>('http://localhost:3000/companies')
      .pipe(finalize(() => {
        this.loadingSignal.set(false);
      }))
      .subscribe({
      next: (companies: Company[]) => this.companiesSignal.set(companies),
      error: (err: HttpErrorResponse) => this.errorSignal
        .set(`Error fetching companies. Status: ${err.status} Error: ${err.message}`)
    })
  }

  private defaultCompanies(): Company[] {
    return [
      {companyName: 'Rocken', industry: 'HR', employeeCount: 200},
      {companyName: 'FinFox', industry: 'Finance', employeeCount: 999},
      {companyName: 'Apple', industry: 'Consumer Electronics', employeeCount: 4876}
    ]
  }
}
