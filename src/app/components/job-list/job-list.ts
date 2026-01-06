import {Component, input, InputSignal, output} from '@angular/core';
import {JobCard} from '../job-card/job-card';
import {Job} from '../../../utils/ts-utils';

@Component({
  selector: 'job-list',
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss',
  imports: [
    JobCard
  ],
  standalone: true
})
export class JobList {

  jobs: InputSignal<Job[]> = input.required();
  deleteJob = output<string>()

  onJobDeleted(id: string) {
    this.deleteJob.emit(id);
  }
}
