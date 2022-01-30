import { Injectable } from '@angular/core';
import { FacultyData } from '../components/faculty-info/faculty-info.component';
import { faculties } from '../constants/contants';
import { FacultyDetails } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FacultyInfoService {
  getAllFaculties() {
    return faculties;
  }

  getFacultyById(id: string): FacultyDetails | null {
    for (let i = 0; i < this.getAllFaculties().length; i++) {
      if (this.getAllFaculties()[i].id === id) return this.getAllFaculties()[i];
    }

    return null;
  }

  constructor() {}
}
