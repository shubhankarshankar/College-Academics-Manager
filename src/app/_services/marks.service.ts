import { Injectable } from '@angular/core';
import { marks } from '../constants/contants';

export interface Marks {
  id: string;
  subjectName: string;
  totalMarks: number;
}

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  getMarks() {
    return marks;
  }

  constructor() {}
}
