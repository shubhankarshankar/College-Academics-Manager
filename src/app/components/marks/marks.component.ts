import { identifierName } from '@angular/compiler';
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
  isAnyMarks: boolean = false;
  stuId: string;
  data: any;
  displayedColumns: string[] = ['class._id', 'class.subject', 'marks'];

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    this.stuId = this.userService.getCurrentUser().cid;
    if (this.role != 'Student') this.router.navigateByUrl('/');
    this.getMarks();
  }

  getMarks() {
    this.marksService.getMarks(this.stuId).subscribe({
      next: (data) => {
        if (data.marks.length > 0) this.isAnyMarks = true;

        this.data = new MatTableDataSource(data.marks as []);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
