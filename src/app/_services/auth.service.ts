import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail: string = '';
  userPass: string = '';

  login(enteredEmail: string, enteredPass: string) {
    this.userEmail = this.userService.getAllDetails().email;
    this.userPass = this.userService.getAllDetails().password;

    return this.userEmail === enteredEmail && this.userPass === enteredPass;
  }

  setLogin() {
    window.localStorage.setItem('isLoggedIn', 'true');
  }

  rmLogin() {
    window.localStorage.removeItem('isLoggedIn');
  }

  constructor(private userService: UserService) {}
}
