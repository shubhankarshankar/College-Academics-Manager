import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'college-academics-manager';

  ngOnInit() {
    sessionStorage.setItem('role', 'Admin');
  }
}
