// src/app/features/auth/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Register</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name">
              @if (registerForm.get('name')?.hasError('required') && 
                   registerForm.get('name')?.touched) {
                <mat-error>Name is required</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              @if (registerForm.get('email')?.hasError('required')) {
                <mat-error>Email is required</mat-error>
              } @else if (registerForm.get('email')?.hasError('email')) {
                <mat-error>Please enter a valid email</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone">
              @if (registerForm.get('phone')?.hasError('required')) {
                <mat-error>Phone is required</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password">
              @if (registerForm.get('password')?.hasError('required')) {
                <mat-error>Password is required</mat-error>
              } @else if (registerForm.get('password')?.hasError('minlength')) {
                <mat-error>Password must be at least 6 characters</mat-error>
              }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="registerForm.invalid">
              Register
            </button>
          </form>
        </mat-card-content>

        <mat-card-footer>
          <p>Already have an account? 
            <a mat-button color="primary" routerLink="/auth/login">Login</a>
          </p>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 40px auto;
      padding: 0 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    mat-card-footer {
      padding: 16px;
      text-align: center;
    }
  `]
})
export class RegisterComponent {
  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as any)
        .subscribe({
          next: () => {
            this.snackBar.open('Registration successful!', 'Close', {
              duration: 3000
            });
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.snackBar.open(
              error.error.message || 'Registration failed', 
              'Close', 
              { duration: 3000 }
            );
          }
        });
    }
  }
}