import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FacultyInfoService } from 'src/app/_services/faculty-info.service';
import { Router } from '@angular/router';

export interface FacultyData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  id: string;
}

@Component({
  selector: 'app-faculty-info',
  templateUrl: './faculty-info.component.html',
  styleUrls: ['./faculty-info.component.scss'],
})
export class FacultyInfoComponent implements OnInit {
  constructor(
    private facultyInfoService: FacultyInfoService,
    private router: Router
  ) {}

  data: any;
  displayedColumns: string[] = ['name', 'email', 'phone'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAllFaculties();
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  getAllFaculties() {
    this.data = new MatTableDataSource(
      this.facultyInfoService.getAllFaculties()
    );
  }

  onRowClick(row: FacultyData) {
    console.log(row.id);
    this.router.navigateByUrl(`faculty-info/${row.id}`);
  }

  doFilter(event: Event) {
    let value: string = (<HTMLInputElement>event.target).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
}
