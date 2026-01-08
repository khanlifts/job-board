import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  job = signal<Job | null>(null);

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const foundJob = this.jobService.jobs().find(job => job.id === params['id']);
      this.job.set(foundJob ? foundJob : null);
    })
  }

  goBack() {
    window.history.back();
  }
}
