import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ListeComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule
  ]
})
export class CategorieModule { }
