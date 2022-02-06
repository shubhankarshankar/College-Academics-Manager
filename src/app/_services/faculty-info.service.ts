import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FacultyInfoService {
  baseUrl = 'http://localhost:3000/api/faculty/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.tokenStorageService.getToken(),
    }),
  };
  getAllFaculties() {
    return this.http.get(this.baseUrl, this.httpOptions);
  }

  getFacultyById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `${id}`, this.httpOptions);
  }

  getFacultyCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'count', this.httpOptions);
  }

  createFaculty(newFaculty: any): Observable<any> {
    return this.http.post(this.baseUrl, newFaculty, this.httpOptions);
  }

  updateFacultyById(id: string, changes: any): Observable<any> {
    return this.http.put(this.baseUrl + `${id}`, changes, this.httpOptions);
  }

  deleteFacultyById(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `${id}`, this.httpOptions);
  }

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
}
