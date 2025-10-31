import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public readonly loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  // UI state
  showWaiting = false;

  constructor() {
    // navigate to /home when logged in
    effect(() => {
      if (this.auth.isLoggedIn()) {
        // If the user is admin, go to /admin, otherwise /home
        if (this.auth.isAdmin()) {
          void this.router.navigateByUrl('/admin');
        } else {
          void this.router.navigateByUrl('/home');
        }
      }
    });

  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;
    const username = this.loginForm.controls.username.value ?? '';
    const password = this.loginForm.controls.password.value ?? '';
    this.auth.login(username, password);
  }

  // helpers for template (signals invoked)
  isLoading(): boolean { return this.auth.isLoading(); }
  error(): string | null { return this.auth.error(); }
}
