import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterDto } from '../../../../models/DTOs/auth.dto';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'), // Adjust the pattern as needed
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password: string = formGroup.get('password')?.value;
    const confirmPassword: string = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ NoPasswordMatch: true });
      return { NoPasswordMatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerDto: RegisterDto = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
      };

      this.authService.register(registerDto).subscribe(
        (response) => {
          if (response) {
            // Registration successful, navigate to dashboard or login
            this.errorMessage ='Regestration successful';
            this.router.navigate(['/auth/login']);
          } else {
            this.errorMessage = 'Registration failed';
          }
        },
        (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Registration error: ' + error.error.message;
          } else {
            this.errorMessage = 'An error occurred during registration';
          }
        }
      );
    } else {
      // Form is invalid
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
  get confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }
  
  get password() {
    return this.registerForm.get('password');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
}