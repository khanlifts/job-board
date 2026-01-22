import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentCanDeactivate } from '../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './job-create.html',
  styleUrl: './job-create.scss'
})
export class JobCreateComponent implements ComponentCanDeactivate {
  private fb = inject(FormBuilder);
  private jobService = inject(JobService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    company: ['', [Validators.required]],
    industry: ['', [Validators.required]],
    salary: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.form.valid) {
      this.jobService.addJobToServer(this.form.value);
      this.form.reset();
      this.router.navigate(['/jobs']);
    }
  }

  canDeactivate(): boolean {
    return this.form.pristine;
  }
}
