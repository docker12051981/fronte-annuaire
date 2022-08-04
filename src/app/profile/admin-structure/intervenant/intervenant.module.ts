import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntervenantRoutingModule } from './intervenant-routing.module';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListeComponent } from './liste/liste.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IntervenantRoutingModule
  ]
})
export class IntervenantModule { }
