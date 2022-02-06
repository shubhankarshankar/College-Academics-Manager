import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/_services/announcement.service';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
    private announcementService: AnnouncementService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  deleteAnnouncement(id: any) {
    if (confirm('Are you sure? this cannot be undone.') === true) {
      this.announcementService.deleteAnnouncementById(id).subscribe({
        next: (data) => {
          this.openSnackBar('Announcement Deleted', 'Dismiss');
          location.reload();
        },
        error: (err) => {
          console.log(err);
          this.openSnackBar('Something Went Wrong', 'Dismiss');
        },
      });
    }
  }

  onUpdateClick(id: any) {
    this.router.navigateByUrl(`announcements/update/${id}`);
  }
}
