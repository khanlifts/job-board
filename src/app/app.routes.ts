import { Routes } from '@angular/router';
import { JobCreateComponent } from './components/job-create/job-create';
import { JobDetailComponent } from './components/job-detail/job-detail';
import { NotFoundComponent } from './components/not-found/not-found';
import { authGuard } from './guards/auth.guard';
import { JobsPageComponent } from './components/jobs-page/jobs-page';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs/create', component: JobCreateComponent, canActivate: [authGuard], canDeactivate: [unsavedChangesGuard] },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'jobs', component: JobsPageComponent },
  {
    path: 'companies',
    loadComponent: () => import('./components/companies-page/companies-page')
      .then(m => m.CompaniesPageComponent)
  },
  {
    path: 'error/:code',
    loadComponent: () => import('./components/error-page/error-page')
      .then(m => m.ErrorPageComponent)
  },
  { path: '**', component: NotFoundComponent }
];
