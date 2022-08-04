import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
const routes: Routes = [

  {
    path: 'list',
    component: ListeComponent, data: { extraParameter: 'dashboardsMenu' },
  },

  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NatureRoutingModule { }
