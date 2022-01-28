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
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!!window.localStorage.getItem('isLoggedIn'))
      this.router.navigateByUrl('/dashboard');
  }
  matcher = new MyErrorStateMatcher();
  public showPassword: boolean = false;

  enteredEmail: string = '';
  enteredPass: string = '';

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
    this._snackBar.open(message, action);
  }

  loginSubmit() {
    console.log(this.loginForm);

    this.enteredEmail = this.loginForm.value.email;
    this.enteredPass = this.loginForm.value.password;

    if (this.loginForm.valid) {
      if (this.authService.login(this.enteredEmail, this.enteredPass)) {
        this.authService.setLogin();
        this.router.navigateByUrl('/dashboard');
      } else {
        this.loginForm.setErrors({
          incorrectPass: true,
        });
        this.openSnackBar('Invalid Credentials', 'Dismiss');
      }
    }
  }
}
