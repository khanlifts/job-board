import { Routes } from '@angular/router';
import { App } from './app';
import { JobCreateComponent } from './components/job-create/job-create';
import { JobDetailComponent } from './components/job-detail/job-detail';
import { CompaniesPageComponent } from './components/companies-page/companies-page';
import { NotFoundComponent } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs/create', component: JobCreateComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'jobs', component: App },
  { path: 'companies', component: CompaniesPageComponent },
  { path: '**', component: NotFoundComponent }
];
