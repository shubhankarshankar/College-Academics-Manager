import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  todayTime: number;
  message: string;

  ngOnInit(): void {
    this.todayTime = new Date().getHours();
    this.message =
      this.todayTime < 12
        ? 'Good Morning'
        : this.todayTime < 18
        ? 'Good Afternoon'
        : 'Good Evening';
  }
}
