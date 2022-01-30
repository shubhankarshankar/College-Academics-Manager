import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.scss'],
})
export class AnnouncementAddComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  role: string;

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin') this.goBack();
  }

  addAnnouncementForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });

  onCreateAnnouncement() {
    console.log(this.addAnnouncementForm.value);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/announcements');
  }
}
