import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserDetails } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDetails: UserDetails[];

  login(enteredEmail: string, enteredPass: string): boolean {
    this.userDetails = this.userService.getAllDetails();

    for (let i = 0; i < this.userDetails.length; i++) {
      if (
        enteredEmail === this.userDetails[i].email &&
        enteredPass === this.userDetails[i].password
      ) {
        this.userService.setCurrentUser(this.userDetails[i].email);
        return true;
      }
    }

    return false;
  }

  setLogin() {
    window.localStorage.setItem('isLoggedIn', 'true');
  }

  rmLogin() {
    window.localStorage.clear();
  }

  constructor(private userService: UserService) {}
}
