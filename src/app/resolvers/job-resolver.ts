import { ResolveFn, Router } from '@angular/router';
import { Job } from '../../utils/ts-utils';
import { inject } from '@angular/core';
import { JobService } from '../services/job.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const jobResolver: ResolveFn<Job> = (route) => {
  const jobService = inject(JobService);
  const router = inject(Router);
  const jobId = route.paramMap.get('id');

  if (!jobId) {
    router.navigate(['/error', 400], {
      state: { message: 'Job ID is required' }
    })

    throw new Error('Job ID is required')
  }

  return jobService.getJobById(jobId).pipe(
    catchError((err: HttpErrorResponse) => {
      router.navigate(['/error', 404], {
        state: { message: `Job with ID "${jobId}" not found.` }
      })
      throw err;
    })
  );
}
