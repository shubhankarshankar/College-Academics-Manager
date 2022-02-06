import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacultyInfoService } from 'src/app/_services/faculty-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-faculty-details-update',
  templateUrl: './faculty-details-update.component.html',
  styleUrls: ['./faculty-details-update.component.scss'],
})
export class FacultyDetailsUpdateComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private facultyInfoService: FacultyInfoService,
    private _snackBar: MatSnackBar
  ) {}

  facId: string;
  facOriginalData: any;

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin')
      this.router.navigateByUrl(`/`);
    this.route.root.firstChild?.params.subscribe(
      (rootParams) => (this.facId = rootParams['id'])
    );

    this.getFacOriginalData(this.facId);
  }

  getFacOriginalData(facId: any) {
    this.facultyInfoService.getFacultyById(facId).subscribe({
      next: (data) => {
        this.facOriginalData = data;
      },
      error: (err) => {
        this.router.navigateByUrl('/faculty-info');
      },
    });
  }

  updateFacultyForm = new FormGroup({
    name: new FormControl(''),
    phno: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    address: new FormControl(''),
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  updateFaculty() {
    const { name, phno, email, address } = this.updateFacultyForm.value;

    if (this.updateFacultyForm.valid) {
      const updatedInfo = {
        name: name === '' ? this.facOriginalData.name : name,
        email: email === '' ? this.facOriginalData.email : email,
        phone: phno === '' ? this.facOriginalData.phone : phno,
        address: address === '' ? this.facOriginalData.address : address,
      };

      this.facultyInfoService
        .updateFacultyById(this.facId, updatedInfo)
        .subscribe({
          next: (data) => {
            this.openSnackBar('Faculty Updated', 'Dismiss');
            this.router.navigateByUrl(`faculty-info`);
          },
          error: (err) => {
            this.openSnackBar('Something Went Wrong', 'Dismiss');
          },
        });
    }
  }

  onCancel() {
    this.router.navigateByUrl(`faculty-info/${this.facId}`);
  }

  public errorHandling = (control: string, error: string) => {
    return this.updateFacultyForm.controls[control].hasError(error);
  };
}
