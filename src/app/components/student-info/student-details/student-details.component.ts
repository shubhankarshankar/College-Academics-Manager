import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDetails } from 'src/app/interfaces';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  studentId: string;
  studentDetails: any;
  role: string;

  constructor(
    private route: ActivatedRoute,
    private studentInfoService: StudentInfoService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    if (this.role != 'Admin') this.router.navigateByUrl('/');

    this.route.params.subscribe((params) => (this.studentId = params['id']));
    this.studentInfoService.getStudentById(this.studentId).subscribe({
      next: (data) => {
        this.studentDetails = data;
      },
      error: (err) => {
        this.router.navigateByUrl('/student-info');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  updateDetails() {
    this.router.navigateByUrl(`student-info/${this.studentId}/update`);
  }

  deleteStudent() {
    if (confirm('Are you Sure? This cannot be undone.')) {
      this.studentInfoService.deleteStudentById(this.studentId).subscribe({
        next: (data) => {
          this.openSnackBar('Student Deleted', 'Dismiss');
          this.router.navigateByUrl('student-info');
        },
        error: (err) => {
          console.log(err);
          this.openSnackBar('Something Went Wrong', 'Dismiss');
        },
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('student-info');
  }
}
