import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

export interface AnnouncementDialogData {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-announcement-dialog',
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.scss'],
})
export class AnnouncementDialogComponent implements OnInit {
  role: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AnnouncementDialogData,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
  }

  onUpdateClick(id: number) {
    this.router.navigateByUrl(`announcements/update/${id}`);
  }
}
