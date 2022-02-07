import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { MarksService } from 'src/app/_services/marks.service';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.scss'],
})
export class ClassStudentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private studentInfoService: StudentInfoService,
    private marksService: MarksService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private assignmentService: AssignmentService
  ) {}

  classId: string;
  studentId: string;
  studentDetails: any;
  studentMarks: any;
  role: string;
  answerLink: string | null;

  updateMarksForm = new FormGroup({
    marks: new FormControl(''),
  });

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    if (this.role === 'Student') this.router.navigateByUrl('/');

    this.route.params.subscribe((params) => {
      this.classId = params['classId'];
      this.studentId = params['studentId'];
    });

    this.getStudentDetails();
    this.getStudentMarks();
    this.getSubmissionDetails();
  }

  goBack() {
    this.router.navigateByUrl(`classes/details/${this.classId}`);
  }

  getSubmissionDetails() {
    this.assignmentService
      .getSubmission(this.classId, this.studentId)
      .subscribe({
        next: (data) => {
          this.answerLink = data.answerUploadPath;
        },
        error: (err) => {
          this.answerLink = null;
        },
      });
  }

  getStudentDetails() {
    this.studentInfoService.getStudentById(this.studentId).subscribe({
      next: (data) => {
        this.studentDetails = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  onUpdateMarks() {
    const { marks } = this.updateMarksForm.value;

    if (!marks) {
      this.openSnackBar('Please Enter Valid Marks', 'Dismiss');
      return;
    }

    if (marks < 1 || marks > 100) {
      this.openSnackBar('Marks Should be between 0 and 100', 'Dismiss');
      return;
    }

    if (this.updateMarksForm.valid) {
      this.marksService
        .postMarks(this.classId, this.studentId, { marks })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.openSnackBar('Marks Uploaded', 'Dismiss');
            location.reload();
          },
          error: (err) => {
            console.log(err);
            this.openSnackBar('Something Went Wrong', 'Dismiss');
          },
        });
    }
  }

  getStudentMarks() {
    this.marksService
      .getMarksByStudentIdAndClassId(this.classId, this.studentId)
      .subscribe({
        next: (data) => {
          if (data) {
            this.studentMarks = data.marks;
          } else {
            this.studentMarks = 0;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
