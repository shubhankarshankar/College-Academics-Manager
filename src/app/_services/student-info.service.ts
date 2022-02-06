import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { students } from '../constants/contants';
import { StudentDetails } from '../interfaces';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StudentInfoService {
  baseUrl = 'http://localhost:3000/api/student/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.tokenStorageService.getToken(),
    }),
  };
  getAllStudents() {
    return this.http.get(this.baseUrl, this.httpOptions);
  }

  getStudentById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `${id}`, this.httpOptions);
  }

  getStudentCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'count', this.httpOptions);
  }

  updateStudentById(id: string, changes: any): Observable<any> {
    return this.http.put(this.baseUrl + `${id}`, changes, this.httpOptions);
  }

  deleteStudentById(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `${id}`, this.httpOptions);
  }

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
}
