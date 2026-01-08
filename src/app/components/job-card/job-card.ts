import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'job-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss'
})
export class JobCard {

  jobId = input<string>('');
  jobTitle = input<string>('');
  company = input<string>('');
  industry = input<string>('');
  salary = input<number | null>(0);
  isDeleting = input<boolean>(false);

  deleteJob = output<void>();

  onDeleteJob() {
    this.deleteJob.emit();
  }

}
