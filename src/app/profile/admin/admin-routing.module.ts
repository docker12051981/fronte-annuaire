import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../../shared/components/error/error.component';
const routes: Routes = [
  {
    path: 'param',
    loadChildren: () => import('src/app/profile/admin/param/param.module').then(mod => mod.ParamModule)
  },
  {
    path: 'fonctionnaire',
    loadChildren: () => import('src/app/profile/admin/fonctionnaire/fonctionnaire.module').then(mod => mod.FonctionnaireModule)
  },
  {
    path: 'structure',
    loadChildren: () => import('src/app/profile/admin/structure/structure.module').then(mod => mod.StructureModule)
  },
  {
    path: 'utilisateur',
    loadChildren: () => import('src/app/profile/admin/utilisateur/utilisateur.module').then(mod => mod.UtilisateurModule)
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
export class AdminRoutingModule { }
