import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AnnouncementService } from 'src/app/_services/announcement.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.scss'],
})
export class AnnouncementAddComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private announcementService: AnnouncementService,
    private _snackBar: MatSnackBar
  ) {}

  role: string;
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin') this.goBack();
  }

  addAnnouncementForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl(''),
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  onCreateAnnouncement() {
    if (this.addAnnouncementForm.valid) {
      const { title, body } = this.addAnnouncementForm.value;
      const newAnnouncement = { title, body };
      this.announcementService.createAnnouncement(newAnnouncement).subscribe({
        next: (data) => {
          this.openSnackBar('Annoucement Created', 'Dismiss');
          this.goBack();
        },
        error: (err) => {
          this.openSnackBar('Something Went Wrong', 'Dismiss');
        },
      });
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.addAnnouncementForm.controls[control].hasError(error);
  };

  goBack() {
    this.router.navigateByUrl('/announcements');
  }
}
