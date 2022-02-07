import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AssignmentDetails,
  AssignmentService,
} from 'src/app/_services/assignment.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.scss'],
})
export class AssignmentDetailsComponent implements OnInit {
  constructor(
    private assingnmentService: AssignmentService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  assignmentId: any;
  assignmentDetails: any;
  classId: string;
  date: Date;
  studentId: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.assignmentId = params['id']));
    this.getAssignmentDetails();
    this.studentId = this.userService.getCurrentUser().cid;
  }

  getAssignmentDetails() {
    this.assingnmentService
      .getStudentAssignmentById(this.assignmentId)
      .subscribe({
        next: (data) => {
          this.assignmentDetails = data;
          console.log(this.assignmentDetails);
          this.date = new Date(this.assignmentDetails.dueDate);
          this.classId = this.assignmentDetails.classId._id;
        },
        error: (err) => {
          console.log(err);
          this.router.navigateByUrl('assignments');
        },
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  updateAnswerForm = new FormGroup({
    answerLink: new FormControl(''),
  });

  onUpdateAnswer() {
    const { answerLink } = this.updateAnswerForm.value;

    if (!answerLink) {
      this.openSnackBar('Please Enter Valid Link', 'Dismiss');
      return;
    }

    if (this.updateAnswerForm.valid) {
      this.assingnmentService
        .postSubmission(this.classId, this.studentId, { path: answerLink })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.openSnackBar('Answer Uploaded', 'Dismiss');
            location.reload();
          },
          error: (err) => {
            console.log(err);
            this.openSnackBar('Something Went Wrong', 'Dismiss');
          },
        });
    }
  }

  goBack() {
    this.router.navigateByUrl('assignments');
  }
}
