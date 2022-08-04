import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecteuractiviteRoutingModule } from './secteuractivite-routing.module';
import { ListeComponent } from './liste/liste.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    SecteuractiviteRoutingModule,
    Ng2SmartTableModule
  ]
})
export class SecteuractiviteModule { }
