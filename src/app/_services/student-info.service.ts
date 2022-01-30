import { Injectable } from '@angular/core';
import { students } from '../constants/contants';
import { StudentDetails } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StudentInfoService {
  getAllStudents() {
    return students;
  }

  getStudentById(id: string): StudentDetails | null {
    for (let i = 0; i < this.getAllStudents().length; i++) {
      if (this.getAllStudents()[i].id === id) return this.getAllStudents()[i];
    }

    return null;
  }

  constructor() {}
}
