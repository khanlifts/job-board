import {Component, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {Industry, Job} from '../../../utils/ts-utils';

@Component({
  selector: 'app-job-posting-form',
  imports: [JsonPipe, ReactiveFormsModule],
  standalone: true,
  templateUrl: './job-posting-form.html',
  styleUrl: './job-posting-form.scss',
})
export class JobPostingForm {
  industries = Object.values(Industry);

  jobSubmitted = output<Job>();

  jobPostingForm = new FormGroup({
    title: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    company: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    industry: new FormControl<Industry | null>(null, { validators: Validators.required }),
    description: new FormControl<string>('', { validators: Validators.minLength(10), nonNullable: true }),
    salary: new FormControl<number | null>(null)
  })

  onSubmit() {
    if (this.jobPostingForm.valid) {
      const formValue = this.jobPostingForm.getRawValue();
      this.jobSubmitted.emit({
        title: formValue.title,
        company: formValue.company,
        industry: formValue.industry as Industry,
        description: formValue.description,
        salary: formValue.salary
      })

      this.jobPostingForm.reset();
    }
  }

  hasError(fieldName: string, errorType: string): boolean {
    const control = this.jobPostingForm.get(fieldName);
    return (control?.hasError(errorType) && (control?.dirty || control?.touched)) || false;
  }
}
