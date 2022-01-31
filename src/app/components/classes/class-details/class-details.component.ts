import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDetails } from 'src/app/interfaces';
import { ClassService } from 'src/app/_services/class.service';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { UserService } from 'src/app/_services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private router: Router,
    private userService: UserService
  ) {}

  role: string;
  classId: string;
  classDetails: any;
  data: any;
  displayedColumns: string[] = ['name', 'email', 'phone'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    if (this.role === 'Student') {
      this.router.navigateByUrl('/');
    }

    this.route.params.subscribe((params) => (this.classId = params['id']));
    this.classDetails = this.classService.getClassById(this.classId);

    if (this.classDetails == null) this.router.navigateByUrl('/classes/all');

    this.createStudentTable();
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  createStudentTable() {
    this.data = new MatTableDataSource(this.classDetails.students);
  }

  goBack() {
    this.router.navigateByUrl('/classes/all');
  }

  doFilter(event: Event) {
    let value: string = (<HTMLInputElement>event.target).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
}
