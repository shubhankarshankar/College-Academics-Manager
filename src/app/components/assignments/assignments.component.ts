import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
})
export class AssignmentsComponent implements OnInit {
  constructor(
    private assingmmentService: AssignmentService,
    private userService: UserService,
    private router: Router
  ) {}

  role: string;
  data: any;
  stuId: string;
  isAnyAssignment = false;
  displayedColumns: string[] = [
    'classId._id',
    'classId.subject',
    'assignmentName',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    this.stuId = this.userService.getCurrentUser().cid;

    if (this.role != 'Student') this.router.navigateByUrl('/');
    this.getStudentAssignments();
  }

  getStudentAssignments() {
    this.assingmmentService.getStudentAssignments(this.stuId).subscribe({
      next: (data) => {
        if (data.assignments.length) this.isAnyAssignment = true;

        this.data = new MatTableDataSource(data.assignments as []);

        this.data.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onAssignmentClick(row: any) {
    console.log(row);

    this.router.navigateByUrl(`/assignments/${row._id}`);
  }
}
