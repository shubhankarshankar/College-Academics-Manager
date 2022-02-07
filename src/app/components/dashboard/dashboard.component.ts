import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AnnouncementService } from 'src/app/_services/announcement.service';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Announcement } from '../announcements/announcements.component';
import { AnnouncementDialogComponent } from '../announcements/announcement-dialog/announcement-dialog.component';
import { FacultyInfoService } from 'src/app/_services/faculty-info.service';
import { StudentInfoService } from 'src/app/_services/student-info.service';
import { ClassService } from 'src/app/_services/class.service';
import { AssignmentService } from 'src/app/_services/assignment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private announcementService: AnnouncementService,
    private userService: UserService,
    public dialog: MatDialog,
    private facultyInfoService: FacultyInfoService,
    private studentInfoService: StudentInfoService,
    private classService: ClassService,
    private assignmentService: AssignmentService
  ) {}

  todayTime: number;
  message: string;
  id: string;
  data: any;
  role: string;
  name: string;
  facCount: number;
  stuCount: number;
  classCount: number;
  facClassCount: number;
  announcementCount: number;
  assignmentCount: number;
  displayedColumns: string[] = ['title', 'body'];
  break: Boolean = screen.availWidth < 960;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    this.name = this.userService.getCurrentUser().name;
    this.id = this.userService.getCurrentUser().cid;
    this.announcementService.getAllAnnouncements().subscribe({
      next: (data) => {
        this.data = new MatTableDataSource(data as []);
      },
    });
    this.todayTime = new Date().getHours();
    this.message =
      this.todayTime < 12
        ? 'Good Morning'
        : this.todayTime < 17
        ? 'Good Afternoon'
        : 'Good Evening';

    this.facultyInfoService.getFacultyCount().subscribe({
      next: (data) => {
        this.facCount = data.count;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.classService.getClassCount().subscribe({
      next: (data) => {
        this.classCount = data.count;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.classService.getClassCountByFaculty(this.id).subscribe({
      next: (data) => {
        this.facClassCount = data.count;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.assignmentService.getAssignmentCount(this.id).subscribe({
      next: (data) => {
        this.assignmentCount = data.count;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.announcementService.getAnnouncementCount().subscribe({
      next: (data) => {
        this.announcementCount = data.count;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.studentInfoService.getStudentCount().subscribe({
      next: (data) => {
        this.stuCount = data.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openAnnouncementDialog(row: Announcement) {
    const dialogRef = this.dialog.open(AnnouncementDialogComponent, {
      data: row,
    });
  }
}
