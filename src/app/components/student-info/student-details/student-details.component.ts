import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDetails } from 'src/app/interfaces';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  studentId: string;
  studentDetails: StudentDetails | null;
  role: string;

  constructor(
    private route: ActivatedRoute,
    private studentInfoService: StudentInfoService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.studentId = params['id']));
    this.studentDetails = this.studentInfoService.getStudentById(
      this.studentId
    );

    if (this.studentDetails == null) this.router.navigateByUrl('/student-info');

    this.role = this.userService.getCurrentUser().role;
  }

  updateDetails() {
    this.router.navigateByUrl(`student-info/${this.studentId}/update`);
  }

  goBack() {
    this.router.navigateByUrl('student-info');
  }
}
