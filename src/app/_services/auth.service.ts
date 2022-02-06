import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserDetails } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService, private http: HttpClient) {}

  userDetails: UserDetails[];

  baseUrl: string = 'http://localhost:3000/api/auth/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'login',
      {
        email,
        password,
      },
      this.httpOptions
    );
  }

  signUp(newUser: Object) {
    return this.http.post(this.baseUrl + 'register', newUser, this.httpOptions);
  }

  rmLogin() {
    window.localStorage.clear();
  }
}
