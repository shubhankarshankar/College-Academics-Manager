import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { Router } from '@angular/router';
import { StudentDetails } from 'src/app/interfaces';
import { UserService } from 'src/app/_services/user.service';

export interface StudentData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  id: string;
}

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
  constructor(
    private studentInfoService: StudentInfoService,
    private router: Router,
    private userService: UserService
  ) {}

  role: string;
  data: any;
  displayedColumns: string[] = ['name', 'email', 'phone'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    this.getAllStudents();
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  getAllStudents() {
    this.data = new MatTableDataSource(
      this.studentInfoService.getAllStudents()
    );
  }

  onRowClick(row: StudentDetails) {
    this.router.navigateByUrl(`student-info/${row.id}`);
  }

  doFilter(event: Event) {
    let value: string = (<HTMLInputElement>event.target).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
}
