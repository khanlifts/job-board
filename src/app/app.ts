import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastContainer } from './components/toast-container/toast-container';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private authService = inject(AuthService);
  protected readonly appTitle = signal('Job Board');
  isLoggedIn = signal(false);

  toggleAuth() {
    this.isLoggedIn.update(val => !val);
    this.authService.setAuthenticated(this.isLoggedIn());
  }
}
