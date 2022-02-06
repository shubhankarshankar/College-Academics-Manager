import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from 'src/app/_services/announcement.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-announcement-update',
  templateUrl: './announcement-update.component.html',
  styleUrls: ['./announcement-update.component.scss'],
})
export class AnnouncementUpdateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private announcementService: AnnouncementService,
    private _snackBar: MatSnackBar
  ) {}

  role: string;
  announcementId: any;
  originalTitle: string | null;
  originalBody: string;

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin') this.goBack();

    this.route.root.firstChild?.params.subscribe(
      (rootParams) => (this.announcementId = rootParams['id'])
    );

    this.getOriginalAnnouncement(this.announcementId);
  }

  getOriginalAnnouncement(announcementId: any) {
    this.announcementService.getAnnouncementById(announcementId).subscribe({
      next: (data) => {
        this.originalTitle = data.title;
        this.originalBody = data.body;
      },
    });
  }

  updateAnnouncementForm = new FormGroup({
    updatedTitle: new FormControl(''),
    updatedBody: new FormControl(''),
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  onUpdateAnnouncement() {
    const { updatedTitle, updatedBody } = this.updateAnnouncementForm.value;

    if (this.updateAnnouncementForm.valid) {
      const updatedInfo = {
        title: updatedTitle === '' ? this.originalTitle : updatedTitle,
        body: updatedBody === '' ? this.originalBody : updatedBody,
      };

      this.announcementService
        .updateAnnouncementById(this.announcementId, updatedInfo)
        .subscribe({
          next: (data) => {
            this.openSnackBar('Annoucement Updated', 'Dismiss');
            this.goBack();
          },
          error: (err) => {
            this.openSnackBar('Something Went Wrong', 'Dismiss');
          },
        });
    }
  }

  goBack() {
    this.router.navigateByUrl('/announcements');
  }
}
