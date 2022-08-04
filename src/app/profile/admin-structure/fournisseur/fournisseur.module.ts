import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ListeComponent,
    DetailComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FournisseurModule { }
