import { Component, inject, input, InputSignal, OnInit, output, signal } from '@angular/core';
import { JobCard } from '../job-card/job-card';
import { Job } from '../../../utils/ts-utils';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'job-list',
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss',
  imports: [
    JobCard,
    RouterLink
  ],
  standalone: true
})
export class JobList implements OnInit {

  jobs: InputSignal<Job[]> = input.required();
  isDeleting: InputSignal<boolean> = input(false);
  deleteJob = output<string>()

  private route = inject(ActivatedRoute);
  sortBy = signal<'salary' | 'title'>('title')

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParamMap => {
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
