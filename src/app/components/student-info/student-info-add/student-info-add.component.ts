import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-info-add',
  templateUrl: './student-info-add.component.html',
  styleUrls: ['./student-info-add.component.scss'],
})
export class StudentInfoAddComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin') this.goBack();
  }

  addStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phno: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
  });

  addStudent() {
    console.log(this.addStudentForm.value);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/student-info');
  }
}
