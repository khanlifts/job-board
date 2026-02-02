import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../../utils/ts-utils';

@Component({
  standalone: true,
  selector: 'job-detail',
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss'
})
export class JobDetailComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  job = signal<Job | null>(null);

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      if (data['job']) {
        this.job.set(data['job']);
      } else {
        this.router.navigate(['/error', 404], {
          state: { message: 'Job data not found.' }
        });
      }
    })
  }

  goBack() {
    window.history.back();
  }
}
