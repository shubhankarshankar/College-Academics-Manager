import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDetails, users } from '../constants/contants';
import { UserDetails } from '../interfaces';
import { TokenStorageService } from './token-storage.service';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000/api/user/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.tokenStorageService.getToken(),
    }),
  };

  getCurrentUser(): any {
    const user: { iat: string; loggedInUser: Object } = jwt_decode(
      this.tokenStorageService.getToken()
    );

    return user.loggedInUser;
  }

  updateUser(id: any, changes: any): Observable<any> {
    return this.http.put(this.baseUrl + `${id}`, changes, this.httpOptions);
  }

  public checkAuth() {
    return !!window.localStorage.getItem('auth-token');
  }

  constructor(
    private tokenStorageService: TokenStorageService,
    private http: HttpClient
  ) {}
}
