import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AssignmentDetails,
  AssignmentService,
} from 'src/app/_services/assignment.service';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.scss'],
})
export class AssignmentDetailsComponent implements OnInit {
  constructor(
    private assingmmentService: AssignmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  assignmentId: number;
  assignmentDetails: AssignmentDetails | null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.assignmentId = params['id']));
    this.assignmentDetails = this.assingmmentService.getStudentAssignmentById(
      this.assignmentId
    );

    if (this.assignmentDetails == null)
      this.router.navigateByUrl('assignments');
  }

  goBack() {
    this.router.navigateByUrl('assignments');
  }
}
