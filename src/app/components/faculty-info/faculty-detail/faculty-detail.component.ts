import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyInfoService } from 'src/app/_services/faculty-info.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-faculty-detail',
  templateUrl: './faculty-detail.component.html',
  styleUrls: ['./faculty-detail.component.scss'],
})
export class FacultyDetailComponent implements OnInit {
  facultyId: string;
  facultyDetails: any;
  role: string;

  constructor(
    private route: ActivatedRoute,
    private facultyInfoService: FacultyInfoService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.facultyId = params['id']));

    this.facultyInfoService.getFacultyById(this.facultyId).subscribe({
      next: (data) => {
        this.facultyDetails = data;
      },
      error: (err) => {
        this.router.navigateByUrl('/faculty-info');
      },
    });

    this.role = this.userService.getCurrentUser().role;
  }

  updateDetails() {
    this.router.navigateByUrl(`faculty-info/${this.facultyId}/update`);
  }

  deleteFaculty() {
    if (confirm('Are you Sure? This cannot be undone.')) {
      this.facultyInfoService.deleteFacultyById(this.facultyId).subscribe({
        next: (data) => {
          this.openSnackBar('Faculty Deleted', 'Dismiss');
          this.router.navigateByUrl('faculty-info');
        },
        error: (err) => {
          console.log(err);
          this.openSnackBar('Something Went Wrong', 'Dismiss');
        },
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('faculty-info');
  }
}
