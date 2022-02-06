import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../components/announcements/announcements.component';
import { anouncements } from '../constants/contants';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  baseUrl = 'http://localhost:3000/api/announcements/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.tokenStorageService.getToken(),
    }),
  };

  getAllAnnouncements() {
    return this.http.get(this.baseUrl, this.httpOptions);
  }

  getAnnouncementById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `${id}`, this.httpOptions);
  }

  createAnnouncement(newAnnouncement: any): Observable<any> {
    return this.http.post(this.baseUrl, newAnnouncement, this.httpOptions);
  }

  updateAnnouncementById(id: any, changes: any): Observable<any> {
    return this.http.put(this.baseUrl + `${id}`, changes, this.httpOptions);
  }

  deleteAnnouncementById(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + `${id}`, this.httpOptions);
  }

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
}
