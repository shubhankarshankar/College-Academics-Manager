import { Injectable } from '@angular/core';
import { userDetails } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getAllDetails = () => userDetails;

  public checkAuth() {
    return !!window.localStorage.getItem('isLoggedIn');
  }

  constructor() {}
}
