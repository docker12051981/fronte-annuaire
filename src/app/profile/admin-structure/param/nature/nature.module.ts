import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NatureRoutingModule } from './nature-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ListeComponent } from './liste/liste.component';

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    NatureRoutingModule,
    Ng2SmartTableModule
  ]
})
export class NatureModule { }
