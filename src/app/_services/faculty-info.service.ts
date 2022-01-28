import { Injectable } from '@angular/core';
import { faculties } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class FacultyInfoService {
  getAllFaculties() {
    return faculties;
  }

  constructor() {}
}
