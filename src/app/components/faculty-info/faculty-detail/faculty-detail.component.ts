import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyDetails } from 'src/app/interfaces';
import { FacultyInfoService } from 'src/app/_services/faculty-info.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-faculty-detail',
  templateUrl: './faculty-detail.component.html',
  styleUrls: ['./faculty-detail.component.scss'],
})
export class FacultyDetailComponent implements OnInit {
  facultyId: string;
  facultyDetails: FacultyDetails | null;
  role: string;

  constructor(
    private route: ActivatedRoute,
    private facultyInfoService: FacultyInfoService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.facultyId = params['id']));
    this.facultyDetails = this.facultyInfoService.getFacultyById(
      this.facultyId
    );

    if (this.facultyDetails == null) this.router.navigateByUrl('/faculty-info');

    this.role = this.userService.getCurrentUser().role;
  }

  updateDetails() {
    this.router.navigateByUrl(`faculty-info/${this.facultyId}/update`);
  }

  goBack() {
    this.router.navigateByUrl('faculty-info');
  }
}
