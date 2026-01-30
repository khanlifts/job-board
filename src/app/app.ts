import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { setAuthenticated } from './guards/auth.guard';
import { ToastContainer } from './components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly appTitle = signal('Job Board');
  isLoggedIn = signal(false);

  toggleAuth() {
    this.isLoggedIn.update(val => !val);
    setAuthenticated(this.isLoggedIn());
  }
}
