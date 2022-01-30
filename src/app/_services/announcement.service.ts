import { Injectable } from '@angular/core';
import { Announcement } from '../components/announcements/announcements.component';
import { anouncements } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  getAllAnnouncements() {
    return anouncements;
  }

  getAnnouncementById(id: number): Announcement | null {
    for (let i = 0; i < this.getAllAnnouncements().length; i++) {
      if (this.getAllAnnouncements()[i].id == id)
        return this.getAllAnnouncements()[i];
    }

    return null;
  }

  constructor() {}
}
