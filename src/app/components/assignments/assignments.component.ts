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
  displayedColumns: string[] = [
    'classId',
    'subjectName',
    'assignmentTitle',
    'facultyName',
    'dueBy',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    if (this.role != 'Student') this.router.navigateByUrl('/');
    this.getStudentAssignments();
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  getStudentAssignments() {
    this.data = new MatTableDataSource(
      this.assingmmentService.getStudentAssignments()
    );
  }

  onAssignmentClick(row: any) {
    console.log('gg');

    this.router.navigateByUrl(`/assignments/${row.id}`);
  }
}
