import {Component, output, input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'job-search-input',
  templateUrl: './job-search-input.html',
  styleUrl: './job-search-input.scss',
  standalone: true,
  imports: [CommonModule]
})
export class JobSearchInput {

  searchChanged = output<string>();
  placeholder = input<string>('');

  onSearchChanged(event: Event) {
    const searchInput = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(searchInput);
  }
}
