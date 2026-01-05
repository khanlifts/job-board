import {Injectable, signal} from '@angular/core';
import {Company} from '../../utils/ts-utils';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor() {
    this.companiesSignal.set(this.defaultCompanies())
  }

  private companiesSignal = signal<Company[]>([]);
  readonly companies = this.companiesSignal.asReadonly()

  private defaultCompanies(): Company[] {
    return [
      {companyName: 'Rocken', industry: 'HR', employeeCount: 200},
      {companyName: 'FinFox', industry: 'Finance', employeeCount: 999},
      {companyName: 'Apple', industry: 'Consumer Electronics', employeeCount: 4876}
    ]
  }
}
