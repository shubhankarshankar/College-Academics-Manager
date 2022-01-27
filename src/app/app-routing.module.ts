import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { FacultyInfoComponent } from './components/faculty-info/faculty-info.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { MarksComponent } from './components/marks/marks.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'student-info',
    component: StudentInfoComponent,
  },
  {
    path: 'faculty-info',
    component: FacultyInfoComponent,
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
  },
  {
    path: 'marks',
    component: MarksComponent,
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  ContactComponent,
  ProfileComponent,
  DashboardComponent,
  StudentInfoComponent,
  FacultyInfoComponent,
  AnnouncementsComponent,
  MarksComponent,
  AttendanceComponent,
  AssignmentsComponent,
];
