export interface Job {
  id: string;
  title: string;
  company: string;
  industry: Industry;
  description: string;
  salary: number | null;
}

export interface Company {
  companyName: string;
  industry: string;
  employeeCount: number;
}

export enum Industry {
  Finance = 'FINANCE',
  Technology = 'TECHNOLOGY',
  HR = 'HR',
  Medicine = 'MEDICINE'
}
