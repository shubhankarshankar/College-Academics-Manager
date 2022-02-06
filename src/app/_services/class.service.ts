import { Injectable } from '@angular/core';
import { ClassDetails } from '../components/classes/classes.component';
import { classDetails, facultyClasses } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  getallClasses() {
    return classDetails;
  }

  getFacultyClasses() {
    return facultyClasses;
  }

  getClassById(id: string) {
    for (let i = 0; i < this.getallClasses().length; i++) {
      if (this.getallClasses()[i].id == id) {
        return this.getallClasses()[i];
      }
    }

    return null;
  }

  constructor() {}
}
