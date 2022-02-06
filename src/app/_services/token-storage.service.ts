import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public setToken(value: string) {
    localStorage.setItem('auth-token', value);
  }

  public getToken(): string {
    return localStorage.getItem('auth-token') || '';
  }

  public removeToken() {
    localStorage.removeItem('auth-token');
  }

  logout() {
    localStorage.clear();
  }
}
