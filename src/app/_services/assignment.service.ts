import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stuAssignments } from '../constants/contants';
import { TokenStorageService } from './token-storage.service';

export interface AssignmentDetails {
  id: number;
  classId: string;
  subjectName: string;
  assignmentTitle: string;
  facultyName: string;
  dueBy: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  baseUrl = 'http://localhost:3000/api/assignment/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.tokenStorageService.getToken(),
    }),
  };

  getStudentAssignments(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `${id}`, this.httpOptions);
  }

  getStudentAssignmentById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `details/${id}`, this.httpOptions);
  }

  createAssignment(classId: string, assignment: object): Observable<any> {
    return this.http.post(
      this.baseUrl + `${classId}`,
      assignment,
      this.httpOptions
    );
  }

  postSubmission(
    classId: string,
    stuId: string,
    submission: object
  ): Observable<any> {
    return this.http.post(
      this.baseUrl + `/submission/${classId}/${stuId}`,
      submission,
      this.httpOptions
    );
  }

  getSubmission(classId: string, stuId: string): Observable<any> {
    return this.http.get(
      this.baseUrl + `/submission/${classId}/${stuId}`,
      this.httpOptions
    );
  }

  getAssignmentCount(stuId: string): Observable<any> {
    return this.http.get(this.baseUrl + `/count/${stuId}`, this.httpOptions);
  }

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
}
