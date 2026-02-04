import { afterEach, beforeEach, describe, expect } from 'vitest';
import { JobService } from './job.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Industry, Job } from '../../utils/ts-utils';
import { API_ENDPOINTS } from '../core/api.constants';

describe('JobService', () => {
  let service: JobService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JobService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(JobService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load jobs from API', () => {
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Test Job',
        company: 'Test Company',
        industry: Industry.Technology,
        description: 'Test Description',
        salary: 100000
      }
    ];

    service.loadJobs();

    const req = httpTesting.expectOne(API_ENDPOINTS.JOBS);
    expect(req.request.method).toBe('GET');

    req.flush(mockJobs);

    expect(service.jobs()).toEqual(mockJobs);
  });

  it('should set loading signal correctly', () => {
    service.loadJobs();

    expect(service.loading()).toBe(true);

    const req = httpTesting.expectOne(API_ENDPOINTS.JOBS);
    req.flush([]);

    expect(service.loading()).toBe(false);
  });

  it('should handle backend errors properly', () => {
    service.loadJobs();

    const req = httpTesting.expectOne(API_ENDPOINTS.JOBS);
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(service.error()).toBeTruthy();
    expect(service.loading()).toBe(false);
  });

  it('should handle network errors properly', () => {
    service.loadJobs();

    const req = httpTesting.expectOne(API_ENDPOINTS.JOBS);
    req.error(new ProgressEvent('network error'));

    expect(service.error()).toBeTruthy();
    expect(service.loading()).toBe(false);
  });
})
