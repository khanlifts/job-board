export interface Job {
  title: string;
  company: string;
  industry: Industry;
  description: string;
  salary: number | null;
}

export enum Industry {
  Finance = 'FINANCE',
  Technology = 'TECHNOLOGY',
  HR = 'HR',
  Medicine = 'MEDICINE'
}
