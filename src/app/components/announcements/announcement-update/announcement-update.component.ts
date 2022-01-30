import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from 'src/app/_services/announcement.service';

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
    private announcementService: AnnouncementService
  ) {}

  role: string;
  announcementId: number;
  originalTitle: string | null;
  originalBody: string;

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin') this.goBack();

    this.route.root.firstChild?.params.subscribe(
      (rootParams) => (this.announcementId = rootParams['id'])
    );

    this.originalTitle =
      this.announcementService.getAnnouncementById(this.announcementId)?.[
        'title'
      ] || '';
    this.originalBody =
      this.announcementService.getAnnouncementById(this.announcementId)?.[
        'body'
      ] || '';

    console.log(this.originalTitle);
    console.log(this.originalBody);
  }

  updateAnnouncementForm = new FormGroup({
    updatedTitle: new FormControl(''),
    updatedBody: new FormControl(''),
  });

  onCreateAnnouncement() {
    console.log(this.updateAnnouncementForm.value);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/announcements');
  }
}
