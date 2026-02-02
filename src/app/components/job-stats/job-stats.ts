import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'job-stats',
  templateUrl: './job-stats.html',
  styleUrl: './job-stats.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobStats {
  searchTerm: InputSignal<string> = input<string>('');
  jobCount: InputSignal<number | undefined> = input<number | undefined>();
  selectedIndustry = input('all');
  statsFoundJobString = input<string>('');
}
