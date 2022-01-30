import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnnouncementService } from 'src/app/_services/announcement.service';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementDialogComponent } from './announcement-dialog/announcement-dialog.component';
import { UserService } from 'src/app/_services/user.service';

export interface Announcement {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  constructor(
    private announcementService: AnnouncementService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  role: string;
  data: any;
  displayedColumns: string[] = ['title', 'body'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAllAnnouncements();
    this.role = this.userService.getCurrentUser().role;
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  getAllAnnouncements() {
    this.data = new MatTableDataSource(
      this.announcementService.getAllAnnouncements()
    );
  }

  openAnnouncementDialog(row: Announcement) {
    const dialogRef = this.dialog.open(AnnouncementDialogComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  doFilter(event: Event) {
    let value: string = (<HTMLInputElement>event.target).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
}
