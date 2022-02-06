import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { marks } from '../constants/contants';
import { TokenStorageService } from './token-storage.service';

export interface Marks {
  id: string;
  subjectName: string;
  totalMarks: number;
}

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  baseUrl = 'http://localhost:3000/api/marks/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.tokenStorageService.getToken(),
    }),
  };

  getMarks(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `${id}`, this.httpOptions);
  }

  getMarksByStudentIdAndClassId(
    classId: string,
    studentId: string
  ): Observable<any> {
    return this.http.get(
      this.baseUrl + `${classId}/${studentId}`,
      this.httpOptions
    );
  }

  postMarks(
    classId: string,
    studentId: string,
    marks: object
  ): Observable<any> {
    return this.http.post(
      this.baseUrl + `${classId}/${studentId}`,
      marks,
      this.httpOptions
    );
  }

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
}
