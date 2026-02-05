import { environment } from '../../environments/environment';

export const API_ENDPOINTS = {
  JOBS: `${environment.apiUrl}/jobs`,
  COMPANIES: `${environment.apiUrl}/companies`
} as const;
