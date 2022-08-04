import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiplomeRoutingModule } from './diplome-routing.module';
import { ListeComponent } from './liste/liste.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    DiplomeRoutingModule
  ]
})
export class DiplomeModule { }
