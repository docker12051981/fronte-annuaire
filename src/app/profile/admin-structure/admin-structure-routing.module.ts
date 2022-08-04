import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../../shared/components/error/error.component';
const routes: Routes = [
  {
    path: 'param',
    loadChildren: () => import('src/app/profile/admin-structure/param/param.module').then(mod => mod.ParamModule)
  },
  {
    path: 'contrat',
    loadChildren: () => import('src/app/profile/admin-structure/contrat/contrat.module').then(mod => mod.ContratModule)
  },
  {
    path: 'fournisseur',
    loadChildren: () => import('src/app/profile/admin-structure/fournisseur/fournisseur.module').then(mod => mod.FournisseurModule)
  },
  {
    path: 'intervenant',
    loadChildren: () => import('src/app/profile/admin-structure/intervenant/intervenant.module').then(mod => mod.IntervenantModule)
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
export class AdminStructureRoutingModule { }
