import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AnnouncementService } from 'src/app/_services/announcement.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private announcementService: AnnouncementService,
    private userService: UserService
  ) {}

  todayTime: number;
  message: string;
  data: any;
  role: string;
  displayedColumns: string[] = ['title'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.role = this.userService.getAllDetails().role;
    this.data = new MatTableDataSource(
      this.announcementService.getAllAnnouncements()
    );
    this.todayTime = new Date().getHours();
    this.message =
      this.todayTime < 12
        ? 'Good Morning'
        : this.todayTime < 17
        ? 'Good Afternoon'
        : 'Good Evening';
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }
}
