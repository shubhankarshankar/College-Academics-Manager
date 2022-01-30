import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-faculty-details-update',
  templateUrl: './faculty-details-update.component.html',
  styleUrls: ['./faculty-details-update.component.scss'],
})
export class FacultyDetailsUpdateComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  facId: string;

  ngOnInit(): void {
    this.route.root.firstChild?.params.subscribe(
      (rootParams) => (this.facId = rootParams['id'])
    );
    if (this.userService.getCurrentUser().role != 'Admin')
      this.router.navigateByUrl(`faculty-info/${this.facId}`);
  }

  updateFacultyForm = new FormGroup({
    name: new FormControl(''),
    phno: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    address: new FormControl(''),
  });

  updateFaculty() {
    console.log(this.updateFacultyForm.value);
    this.router.navigateByUrl(`faculty-info`);
  }

  onCancel() {
    this.router.navigateByUrl(`faculty-info/${this.facId}`);
  }

  public errorHandling = (control: string, error: string) => {
    return this.updateFacultyForm.controls[control].hasError(error);
  };
}
