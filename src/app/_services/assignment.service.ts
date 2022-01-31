import { Injectable } from '@angular/core';
import { stuAssignments } from '../constants/contants';

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
  getStudentAssignments(): AssignmentDetails[] {
    return stuAssignments;
  }

  getStudentAssignmentById(id: number): AssignmentDetails | null {
    for (let i = 0; i < this.getStudentAssignments().length; i++) {
      if (this.getStudentAssignments()[i].id == id) {
        return this.getStudentAssignments()[i];
      }
    }

    return null;
  }

  constructor() {}
}
