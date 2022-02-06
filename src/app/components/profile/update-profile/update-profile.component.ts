import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  userId: number;
  userOriginalData: any;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.userId = params['id']));
    this.getUserOriginalData();
  }

  genders: any = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'others', viewValue: 'Others' },
  ];

  updateProfileForm = new FormGroup({
    name: new FormControl(''),
    phno: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
  });

  getUserOriginalData() {
    this.userOriginalData = this.userService.getCurrentUser();
  }

  onCancel() {
    this.router.navigateByUrl(`profile`);
  }

  onUpdateProfile() {
    const { name, email, phno, gender, dob, address } =
      this.updateProfileForm.value;

    if (this.updateProfileForm.valid) {
      const updatedInfo = {
        name: name === '' ? this.userOriginalData.name : name,
        email: email === '' ? this.userOriginalData.email : email,
        phone: phno === '' ? this.userOriginalData.phone : phno,
        gender: gender === '' ? this.userOriginalData.gender : gender,
        dob: dob === '' ? this.userOriginalData.dob : dob,
        address: address === '' ? this.userOriginalData.address : address,
      };

      this.userService.updateUser(this.userId, updatedInfo).subscribe({
        next: (data) => {
          this.openSnackBar('Profile Updated', 'Dismiss');
          this.router.navigateByUrl(`/`);
        },
        error: (err) => {
          this.openSnackBar('Something Went Wrong', 'Dismiss');
        },
      });
    }
  }
}
