import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    phno: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  public errorHandling = (control: string, error: string) => {
    return this.registerationForm.controls[control].hasError(error);
  };

  registerSubmit() {
    console.log(this.registerationForm.status);
    console.log(this.registerationForm.value);
  }
}
