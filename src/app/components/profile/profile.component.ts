import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { UpdateProfileDialogComponent } from './update-profile-dialog/update-profile-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  date: Date;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(UpdateProfileDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateProfile() {
    this.router.navigateByUrl(`profile/update/${this.currentUser.cid}`);
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.date = new Date(this.currentUser.dob);
  }
}
