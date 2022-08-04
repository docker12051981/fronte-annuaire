import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoustypeRoutingModule } from './soustype-routing.module';
import { ListeComponent } from './liste/liste.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    SoustypeRoutingModule,
    Ng2SmartTableModule
  ]
})
export class SoustypeModule { }
