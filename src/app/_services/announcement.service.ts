import { Injectable } from '@angular/core';
import { anouncements } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  getAllAnnouncements() {
    return anouncements;
  }

  constructor() {}
}
