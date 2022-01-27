import { Injectable } from '@angular/core';
import { students } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class StudentInfoService {
  getAllStudents() {
    return students;
  }

  constructor() {}
}
