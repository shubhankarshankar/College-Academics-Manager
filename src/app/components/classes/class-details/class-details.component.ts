import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDetails } from 'src/app/interfaces';
import { ClassService } from 'src/app/_services/class.service';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { UserService } from 'src/app/_services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  role: string;
  classId: string;
  facId: string | null = null;
  classDetails: any;
  data: any;
  displayedColumns: string[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    if (this.role === 'Student') {
      this.router.navigateByUrl('/');
    }
    this.facId =
      this.role === 'Faculty' ? this.userService.getCurrentUser()?.cid : null;
    this.route.params.subscribe((params) => (this.classId = params['id']));

    this.displayedColumns = ['name', 'email', 'phone'];

    this.getClassDetailsById();
  }

  getClassDetailsById() {
    this.classService.getClassById(this.classId).subscribe({
      next: (data) => {
        this.classDetails = data;
        this.createStudentTable();
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;
      },
      error: (err) => {
        this.goBack();
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  createStudentTable() {
    this.data = new MatTableDataSource(this.classDetails.students);
  }

  onDeleteClass() {
    if (confirm('Are you sure? this cannot be undone.') === true) {
      this.classService.deleteClass(this.classId).subscribe({
        next: (data) => {
          this.openSnackBar('Classroom Deleted', 'Dismiss');
          this.goBack();
        },
        error: (err) => {
          console.log(err);
          this.openSnackBar('Something Went Wrong', 'Dismiss');
        },
      });
    }
  }

  onRowClick(row: any) {
    this.router.navigate([`classes/details/${this.classId}/${row._id}`]);
  }

  goBack() {
    if (this.role === 'Admin') this.router.navigateByUrl('/classes/all');
    else this.router.navigateByUrl(`/classes/${this.facId}`);
  }

  doFilter(event: Event) {
    let value: string = (<HTMLInputElement>event.target).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
}
