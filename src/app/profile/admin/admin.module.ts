import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FonctionModule } from './param/fonction/fonction.module';
import { ParamModule } from './param/param.module';
import { StructureModule } from './structure/structure.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FonctionModule,
    ParamModule,
    StructureModule,
    UtilisateurModule
  ],
 
})
export class AdminModule { }
