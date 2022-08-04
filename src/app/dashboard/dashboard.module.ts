import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from './home/admin/admin.component';
import { AdminStructureComponent } from './home/admin-structure/admin-structure.component';
import { UserComponent } from './home/user/user.component';
import { DecideurComponent } from './home/decideur/decideur.component';
import { StructureComponent } from './options/structure/structure.component';
import { FonctionnaireComponent } from './options/fonctionnaire/fonctionnaire.component';
import { UtilisateurComponent } from './options/utilisateur/utilisateur.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeletComponent } from './options/selet/selet.component';
import { ContratComponent } from './options/contrat/contrat.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminStructureComponent,
    UserComponent,
    DecideurComponent,
    StructureComponent,
    FonctionnaireComponent,
    UtilisateurComponent,
    SeletComponent,
    ContratComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
