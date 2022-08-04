import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { ListeComponent } from './liste/liste.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    TypeRoutingModule,
    Ng2SmartTableModule
  ]
})
export class TypeModule { }
