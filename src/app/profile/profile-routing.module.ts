import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('src/app/profile/admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: 'admin-structure',
    loadChildren: () => import('src/app/profile/admin-structure/admin-structure.module').then(mod => mod.AdminStructureModule)
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/profile/user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'decideur',
    loadChildren: () => import('src/app/profile/decideur/decideur.module').then(mod => mod.DecideurModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
