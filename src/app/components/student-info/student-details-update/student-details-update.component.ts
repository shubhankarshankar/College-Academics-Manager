import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-details-update',
  templateUrl: './student-details-update.component.html',
  styleUrls: ['./student-details-update.component.scss'],
})
export class StudentDetailsUpdateComponent implements OnInit {
  stuId: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.root.firstChild?.params.subscribe(
      (rootParams) => (this.stuId = rootParams['id'])
    );
    if (this.userService.getCurrentUser().role != 'Admin')
      this.router.navigateByUrl(`student-info/${this.stuId}`);
  }

  updateStudentForm = new FormGroup({
    name: new FormControl(''),
    phno: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    address: new FormControl(''),
  });

  updateStudent() {
    console.log(this.updateStudentForm.value);
    this.router.navigateByUrl(`student-info`);
  }

  onCancel() {
    this.router.navigateByUrl(`student-info/${this.stuId}`);
  }

  public errorHandling = (control: string, error: string) => {
    return this.updateStudentForm.controls[control].hasError(error);
  };
}
