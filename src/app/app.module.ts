import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ClassesComponent } from './components/classes/classes.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { UpdateProfileDialogComponent } from './components/profile/update-profile-dialog/update-profile-dialog.component';
import { FacultyDetailsUpdateComponent } from './components/faculty-info/faculty-details-update/faculty-details-update.component';
import { StudentDetailsComponent } from './components/student-info/student-details/student-details.component';
import { StudentDetailsUpdateComponent } from './components/student-info/student-details-update/student-details-update.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    routingComponents,
    UpdateProfileComponent,
    UpdateProfileDialogComponent,
    FacultyDetailsUpdateComponent,
    StudentDetailsComponent,
    StudentDetailsUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
