import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MarksService } from 'src/app/_services/marks.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss'],
})
export class MarksComponent implements OnInit {
  constructor(
    private marksService: MarksService,
    private userService: UserService,
    private router: Router
  ) {}

  role: string;
  data: any;
  displayedColumns: string[] = ['classId', 'subjectName', 'totalMarks'];

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    if (this.role != 'Student') this.router.navigateByUrl('/');
    this.getMarks();
  }

  getMarks() {
    this.data = new MatTableDataSource(this.marksService.getMarks());
  }
}
