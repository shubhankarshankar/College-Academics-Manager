import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { UpdateProfileDialogComponent } from './components/profile/update-profile-dialog/update-profile-dialog.component';
import { AnnouncementDialogComponent } from './components/announcements/announcement-dialog/announcement-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    routingComponents,
    UpdateProfileComponent,
    UpdateProfileDialogComponent,
    AnnouncementDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
