import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../../utils/ts-utils';

@Component({
  standalone: true,
  selector: 'job-detail',
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss'
})
export class JobDetailComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private jobService = inject(JobService);
  private router = inject(Router);
  job = signal<Job | null>(null);

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const jobId = params['id'];

      const foundJob = this.jobService.jobs().find(job => job.id === params['id']);

      if (foundJob) {
        this.job.set(foundJob);
      } else {
        this.router.navigate(['/error', 404], {
          state: { message: `Job with ID "${jobId}" not found` }
        });
      }

    })
  }

  goBack() {
    window.history.back();
  }
}
