import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClassService } from 'src/app/_services/class.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { StudentDetails } from 'src/app/interfaces';

export interface ClassDetails {
  id: string;
  name: string;
  subjectName: string;
  students: StudentDetails;
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  constructor(
    private classService: ClassService,
    private router: Router,
    private userService: UserService
  ) {}

  role: string;
  data: any;
  displayedColumns: string[] = ['id', 'subjectName', 'name'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    if (this.role != 'Admin') this.router.navigateByUrl('/');

    this.getAllClasses();
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  getAllClasses() {
    this.data = new MatTableDataSource(this.classService.getallClasses());
  }

  onRowClick(row: ClassDetails) {
    this.router.navigateByUrl(`classes/details/${row.id}`);
  }

  doFilter(event: Event) {
    let value: string = (<HTMLInputElement>event.target).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
}
