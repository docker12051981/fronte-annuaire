import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratRoutingModule } from './contrat-routing.module';
import { CreateComponent } from './create/create.component';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListeComponent,
    DetailComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ContratRoutingModule
  ]
})
export class ContratModule { }
