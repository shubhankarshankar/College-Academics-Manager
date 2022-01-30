import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { UpdateProfileDialogComponent } from './update-profile-dialog/update-profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: UserDetails;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(UpdateProfileDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
}
