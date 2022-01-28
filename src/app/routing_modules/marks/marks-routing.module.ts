import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarksComponent } from 'src/app/components/marks/marks.component';

const routes: Routes = [
  {
    path: '',
    component: MarksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarksRoutingModule {}
