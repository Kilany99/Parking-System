import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginDto = this.loginForm.value;
      this.authService.login(loginDto).subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid login credentials';
          }
        },
        (error) => {
          // Handle error
          this.errorMessage = 'An error occurred during login'+ error.message;
        }
      );
    }
  }
}