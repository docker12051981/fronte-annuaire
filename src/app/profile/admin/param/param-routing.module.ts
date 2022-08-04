import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'type',
    loadChildren: () => import('src/app/profile/admin/param/type/type.module').then(mod => mod.TypeModule)
  },
  {
    path: 'soustype',
    loadChildren: () => import('src/app/profile/admin/param/soustype/soustype.module').then(mod => mod.SoustypeModule)
  },

  {
    path: 'grade',
    loadChildren: () => import('src/app/profile/admin/param/grade/grade.module').then(mod => mod.GradeModule)
  },

  {
    path: 'fonction',
    loadChildren: () => import('src/app/profile/admin/param/fonction/fonction.module').then(mod => mod.FonctionModule)
  },

  {
    path: 'categorie',
    loadChildren: () => import('src/app/profile/admin/param/categorie/categorie.module').then(mod => mod.CategorieModule)
  },

  {
    path: 'classe',
    loadChildren: () => import('src/app/profile/admin/param/classe/classe.module').then(mod => mod.ClasseModule)
  },

  {
    path: 'diplome',
    loadChildren: () => import('src/app/profile/admin/param/diplome/diplome.module').then(mod => mod.DiplomeModule)
  },

  {
    path: 'secteuractivite',
    loadChildren: () => import('src/app/profile/admin/param/secteuractivite/secteuractivite.module').then(mod => mod.SecteuractiviteModule)
  },
  {
    path: 'groupe',
    loadChildren: () => import('src/app/profile/admin/param/groupe/groupe.module').then(mod => mod.GroupeModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamRoutingModule { }
