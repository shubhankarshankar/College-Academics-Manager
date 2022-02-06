import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacultyInfoService } from 'src/app/_services/faculty-info.service';

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
  selector: 'app-faculty-info-add',
  templateUrl: './faculty-info-add.component.html',
  styleUrls: ['./faculty-info-add.component.scss'],
})
export class FacultyInfoAddComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private facultyInfoService: FacultyInfoService
  ) {}

  role: string;
  genders: any = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'others', viewValue: 'Others' },
  ];

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin') this.goBack();
  }

  addFacultyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  public errorHandling = (control: string, error: string) => {
    return this.addFacultyForm.controls[control].hasError(error);
  };

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  addFaculty() {
    const { name, email, phone, gender, dob, address } =
      this.addFacultyForm.value;

    console.log(this.addFacultyForm);
    console.log(this.addFacultyForm.value);

    if (this.addFacultyForm.valid) {
      const newFaculty = {
        name,
        email,
        phone,
        gender,
        dob,
        address,
      };

      this.facultyInfoService.createFaculty(newFaculty).subscribe({
        next: (data) => {
          this.openSnackBar('Faculty Added', 'Dismiss');
          this.goBack();
        },
        error: (err) => {
          this.addFacultyForm.setErrors(err.error);

          console.log(this.addFacultyForm.errors);
        },
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/faculty-info');
  }
}
