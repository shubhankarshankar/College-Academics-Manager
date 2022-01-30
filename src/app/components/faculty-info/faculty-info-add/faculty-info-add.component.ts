import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-faculty-info-add',
  templateUrl: './faculty-info-add.component.html',
  styleUrls: ['./faculty-info-add.component.scss'],
})
export class FacultyInfoAddComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  role: string;

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Admin') this.goBack();
  }

  addFacultyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phno: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
  });

  addFaculty() {
    console.log(this.addFacultyForm.value);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/faculty-info');
  }
}
