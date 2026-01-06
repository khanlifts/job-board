import {Component, input, output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'job-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss'
})
export class JobCard {

  title = input<string>('Pharmacist');

  company = input<string>('Bogus Company')

  deleteJob = output<void>();

  onDeleteJob() {
    this.deleteJob.emit();
  }

}
