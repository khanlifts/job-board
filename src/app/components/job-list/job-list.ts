import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  signal
} from '@angular/core';
import { JobCard } from '../job-card/job-card';
import { Job } from '../../../utils/ts-utils';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'job-list',
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss',
  imports: [
    JobCard,
    RouterLink
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobList implements OnInit {
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  jobs: InputSignal<Job[]> = input.required();
  isDeleting: InputSignal<boolean> = input(false);
  deleteJob = output<string>()
  sortBy = signal<'salary' | 'title'>('title')

  ngOnInit() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(queryParamMap => {
      const sort = queryParamMap.get('sort');
      if (sort === 'title' || sort === 'salary') {
        this.sortBy.set(sort);
      }
    })
  }

  onJobDeleted(id: string) {
    this.deleteJob.emit(id);
  }
}
