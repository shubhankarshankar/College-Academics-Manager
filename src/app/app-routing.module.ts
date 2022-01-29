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
import { AuthenticationGuard } from './_guards/authentication.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./routing_modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./routing_modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./routing_modules/contact/contact.module').then(
        (m) => m.ContactModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'classes',
    loadChildren: () =>
      import('./routing_modules/classes/classes.module').then(
        (m) => m.ClassesModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./routing_modules/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./routing_modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'student-info',
    loadChildren: () =>
      import('./routing_modules/student-info/student-info.module').then(
        (m) => m.StudentInfoModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'faculty-info',
    loadChildren: () =>
      import('./routing_modules/faculty-info/faculty-info.module').then(
        (m) => m.FacultyInfoModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'announcements',
    loadChildren: () =>
      import('./routing_modules/announcements/announcements.module').then(
        (m) => m.AnnouncementsModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'marks',
    loadChildren: () =>
      import('./routing_modules/marks/marks.module').then((m) => m.MarksModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'assignments',
    loadChildren: () =>
      import('./routing_modules/assignments/assignments.module').then(
        (m) => m.AssignmentsModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./routing_modules/attendance/attendance.module').then(
        (m) => m.AttendanceModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
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
