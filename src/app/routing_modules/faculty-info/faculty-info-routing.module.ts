import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyDetailComponent } from 'src/app/components/faculty-info/faculty-detail/faculty-detail.component';
import { FacultyDetailsUpdateComponent } from 'src/app/components/faculty-info/faculty-details-update/faculty-details-update.component';
import { FacultyInfoComponent } from 'src/app/components/faculty-info/faculty-info.component';

const routes: Routes = [
  {
    path: '',
    component: FacultyInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultyInfoRoutingModule {}
