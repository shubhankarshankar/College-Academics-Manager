import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-details-update',
  templateUrl: './student-details-update.component.html',
  styleUrls: ['./student-details-update.component.scss'],
})
export class StudentDetailsUpdateComponent implements OnInit {
  stuId: string;
  stuOriginalData: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private studentInfoService: StudentInfoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.root.firstChild?.params.subscribe(
      (rootParams) => (this.stuId = rootParams['id'])
    );
    if (this.userService.getCurrentUser().role != 'Admin')
      this.router.navigateByUrl(`student-info/${this.stuId}`);

    this.getStuOriginalData(this.stuId);
  }

  updateStudentForm = new FormGroup({
    name: new FormControl(''),
    phno: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    address: new FormControl(''),
  });

  getStuOriginalData(stuId: any) {
    this.studentInfoService.getStudentById(stuId).subscribe({
      next: (data) => {
        this.stuOriginalData = data;
      },
      error: (err) => {
        this.router.navigateByUrl('/student-info');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  updateStudent() {
    const { name, phno, email, address } = this.updateStudentForm.value;

    if (this.updateStudentForm.valid) {
      const updatedInfo = {
        name: name === '' ? this.stuOriginalData.name : name,
        email: email === '' ? this.stuOriginalData.email : email,
        phone: phno === '' ? this.stuOriginalData.phone : phno,
        address: address === '' ? this.stuOriginalData.address : address,
      };

      this.studentInfoService
        .updateStudentById(this.stuId, updatedInfo)
        .subscribe({
          next: (data) => {
            this.openSnackBar('Student Updated', 'Dismiss');
            this.router.navigateByUrl(`student-info`);
          },
          error: (err) => {
            this.openSnackBar('Something Went Wrong', 'Dismiss');
          },
        });
    }
  }

  onCancel() {
    this.router.navigateByUrl(`student-info/${this.stuId}`);
  }

  public errorHandling = (control: string, error: string) => {
    return this.updateStudentForm.controls[control].hasError(error);
  };
}
