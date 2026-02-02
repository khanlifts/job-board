import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../../utils/ts-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'job-detail',
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobDetailComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  job = signal<Job | null>(null);

  ngOnInit() {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
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
