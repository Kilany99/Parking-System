import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  forgotPasswordForm: FormGroup;
  errorMessage: string = '';
  showResetPasswordDialog: boolean = false;
  showForgotPasswordEmailInput: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.resetPasswordForm = this.fb.group({
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });

    this.forgotPasswordForm = this.fb.group({
      forgotPasswordEmail: ['', [Validators.required, Validators.email]],
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
            this.errorMessage = 'Invalid login credentials. Please try again.';
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred during login: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
  

  onForgotPassword(): void {
    this.showForgotPasswordEmailInput = true;
  }

  onForgotPasswordSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const forgotPasswordDto = { email: this.forgotPasswordEmail?.value };
      this.showResetPasswordDialog = true;

      this.authService.forgotPassword(forgotPasswordDto).subscribe(
        (response) => {
          this.errorMessage = 'Password reset link sent to your email.';
          this.showForgotPasswordEmailInput = false;
          this.showResetPasswordDialog = true;
        },
        (error) => {
          // Handle error
          this.errorMessage = 'An error occurred while sending reset link: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid email address.';
    }
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const resetPasswordDto = this.resetPasswordForm.value;
      this.authService.resetPassword(resetPasswordDto).subscribe(
        (response) => {
          this.errorMessage = 'Password has been reset successfully.';
          this.showResetPasswordDialog = false;
        },
        (error) => {
          // Handle error
          this.errorMessage = 'An error occurred while resetting password: ' + error.message;
        }
      );
    }
  }

  onDialogClose(): void {
    this.showResetPasswordDialog = false;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get token() {
    return this.resetPasswordForm.get('token');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get forgotPasswordEmail() {
    return this.forgotPasswordForm.get('forgotPasswordEmail');
  }
}