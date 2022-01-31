import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment-create',
  templateUrl: './assignment-create.component.html',
  styleUrls: ['./assignment-create.component.scss'],
})
export class AssignmentCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  role: string;
  classId: string;
  srcResult: any;

  addAssignmentForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    question: new FormControl('', [Validators.required]),
    dueBy: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.userService.getCurrentUser().role != 'Faculty')
      this.router.navigateByUrl('/');
    this.route.params.subscribe((params) => (this.classId = params['classId']));
  }

  onCreateAnnouncement() {
    console.log(this.addAssignmentForm.value);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl(`/classes/details/${this.classId}`);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
