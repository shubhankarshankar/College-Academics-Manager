import { Injectable } from '@angular/core';
import { userDetails, users } from '../constants/contants';
import { UserDetails } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: string;

  getAllDetails = (): UserDetails[] => users;

  setCurrentUser(userEmail: string) {
    window.localStorage.setItem('userEmail', userEmail);
  }

  getCurrentUser(): UserDetails {
    let userEmail: string = window.localStorage.getItem('userEmail') || '';

    for (let i = 0; i < this.getAllDetails().length; i++) {
      if (this.getAllDetails()[i].email === userEmail)
        return this.getAllDetails()[i];
    }

    return this.getAllDetails()[<any>userEmail];
  }

  public checkAuth() {
    return !!window.localStorage.getItem('isLoggedIn');
  }

  constructor() {}
}
