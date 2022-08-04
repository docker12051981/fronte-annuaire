import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'type',
    loadChildren: () => import('src/app/profile/admin-structure/param/type/type.module').then(mod => mod.TypeModule)
  },
  {
    path: 'nature',
    loadChildren: () => import('src/app/profile/admin-structure/param/nature/nature.module').then(mod => mod.NatureModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamRoutingModule { }
