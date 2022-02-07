import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignment-create',
  templateUrl: './assignment-create.component.html',
  styleUrls: ['./assignment-create.component.scss'],
})
export class AssignmentCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private _snackBar: MatSnackBar
  ) {}

  role: string;
  classId: string;
  srcResult: any;

  addAssignmentForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    question: new FormControl(''),
    description: new FormControl(''),
    dueBy: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Faculty')
      this.router.navigateByUrl('/');
    this.route.params.subscribe((params) => (this.classId = params['classId']));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  onCreateAnnouncement() {
    const { title, question, description, dueBy } =
      this.addAssignmentForm.value;

    const newAssignment = {
      assignmentName: title,
      path: question,
      assignmentDescription: description,
      dueDate: dueBy,
    };

    if (this.addAssignmentForm.valid) {
      this.assignmentService
        .createAssignment(this.classId, newAssignment)
        .subscribe({
          next: (data) => {
            console.log(data);

            this.openSnackBar('Assignment Uploaded', 'Dismiss');
            this.goBack();
          },
          error: (err) => {
            console.log(err);
            this.openSnackBar('Something Went Wrong', 'Dismiss');

            this.goBack();
          },
        });
    }
  }

  goBack() {
    this.router.navigateByUrl(`/classes/details/${this.classId}`);
  }

  // onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');

  //   if (typeof FileReader !== 'undefined') {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       this.srcResult = e.target.result;
  //     };

  //     reader.readAsArrayBuffer(inputNode.files[0]);
  //   }
  // }
}
