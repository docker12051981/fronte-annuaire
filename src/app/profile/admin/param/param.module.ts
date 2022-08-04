import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamRoutingModule } from './param-routing.module';
import { TypeModule } from './type/type.module';
import { SoustypeModule } from './soustype/soustype.module';
import { GradeModule } from './grade/grade.module';
import { FonctionModule } from './fonction/fonction.module';
import { CategorieModule } from './categorie/categorie.module';
import { ClasseModule } from './classe/classe.module';
import { DiplomeModule } from './diplome/diplome.module';
import { SecteuractiviteModule } from './secteuractivite/secteuractivite.module';
import { GroupeModule } from './groupe/groupe.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ParamRoutingModule,
    TypeModule,
    SoustypeModule,
    GradeModule,
    FonctionModule,
    CategorieModule,
    ClasseModule,
    DiplomeModule,
    SecteuractiviteModule,
    GroupeModule
  ]
})
export class ParamModule { }
