import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  baseUrl = 'http://localhost:3000/api/class/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.tokenStorageService.getToken(),
    }),
  };

  getallClasses(): Observable<any> {
    return this.http.get(this.baseUrl, this.httpOptions);
  }

  getFacultyClasses(facId: string): Observable<any> {
    return this.http.get(this.baseUrl + `faculty/${facId}`, this.httpOptions);
  }

  getClassById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `details/${id}`, this.httpOptions);
  }

  getClassCount(): Observable<any> {
    return this.http.get(this.baseUrl + `count`, this.httpOptions);
  }

  getClassCountByFaculty(facId: string): Observable<any> {
    return this.http.get(this.baseUrl + `count/${facId}`, this.httpOptions);
  }

  deleteClass(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `${id}`, this.httpOptions);
  }

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
}
