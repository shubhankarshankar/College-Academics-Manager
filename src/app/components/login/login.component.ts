import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (!!window.localStorage.getItem('auth-token'))
      this.router.navigateByUrl('/dashboard');
  }
  matcher = new MyErrorStateMatcher();
  public showPassword: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  loginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (this.loginForm.valid) {
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.tokenStorageService.setToken(data.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: () => {
          this.loginForm.setErrors({ incorrectPass: true });
          this.openSnackBar('Invalid Credentials', 'Dismiss');
        },
      });
    }
  }
}
