import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasseRoutingModule } from './classe-routing.module';
import { ListeComponent } from './liste/liste.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    ClasseRoutingModule,
    Ng2SmartTableModule
  ]
})
export class ClasseModule { }
