import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  genders: any = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'others', viewValue: 'Others' },
  ];

  registerationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public showPassword: boolean = false;
  matcher = new MyErrorStateMatcher();

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public showConfirmPassword: boolean = false;

  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  public errorHandling = (control: string, error: string) => {
    return this.registerationForm.controls[control].hasError(error);
  };

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  registerSubmit() {
    const {
      name,
      email,
      phone,
      gender,
      dob,
      address,
      password,
      confirmPassword,
    } = this.registerationForm.value;

    if (password != confirmPassword) {
      this.registerationForm.setErrors({ passMismatch: true });
    }

    console.log(this.registerationForm);
    console.log(this.registerationForm.value);

    if (this.registerationForm.valid) {
      const newUser = {
        name,
        email,
        phone,
        gender,
        dob,
        address,
        password,
      };

      this.authService.signUp(newUser).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.registerationForm.setErrors(err.error);

          console.log(this.registerationForm.errors);
        },
      });

      //this.router.navigate(['/login']);
    }
  }
}
