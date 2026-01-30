import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'error-page',
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss'
})
export class ErrorPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errorCode = signal<number>(404);
  errorMessage = signal<string>('Page not found. The resource you are looking for does not exist.');

  ngOnInit() {
    this.route.params.subscribe(params => {
      const code = parseInt(params['code'])
      this.errorCode.set(code);
    })

    if (window.history.state?.['message']) {
      this.errorMessage.set(window.history.state['message']);
    }
  }

  errorTitle() {
    const code = this.errorCode();
    switch (code) {
      case 404:
        return 'Page Not Found';
      case 500:
        return 'Server Error';
      case 403:
        return 'Access Forbidden';
      case 0:
        return 'Network Error';
      default:
        return 'Error';
    }
  }

  goBack() {
    window.history.back();
  }

  goHome() {
    this.router.navigate(['/jobs']);
  }

}
