import { Component, output, signal } from '@angular/core';
import { Industry } from '../../../utils/ts-utils';

@Component({
  selector: 'job-filter-form',
  templateUrl: './job-filter-form.html',
  styleUrl: './job-filter-form.scss',
  standalone: true
})
export class JobFilterForm {
  industries = Object.values(Industry);

  industriesChanged = output<Set<Industry>>();

  selectedIndustries = signal<Set<Industry>>(new Set());

  toggleIndustry(industry: Industry) {
    this.selectedIndustries.update(currentSet => {

      const nextSet = new Set(currentSet);

      if (nextSet.has(industry)) {
        nextSet.delete(industry);
      } else {
        nextSet.add(industry);
      }

      this.industriesChanged.emit(nextSet);

      return nextSet;
    })
  }
}
