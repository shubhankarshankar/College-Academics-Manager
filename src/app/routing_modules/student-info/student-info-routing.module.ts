import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentInfoComponent } from 'src/app/components/student-info/student-info.component';

const routes: Routes = [
  {
    path: '',
    component: StudentInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentInfoRoutingModule {}
