import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { TreeModule } from '@circlon/angular-tree-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FonctionnaireRoutingModule } from './fonctionnaire-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    ListeComponent,
    DetailComponent,
    EditComponent,
    SearchComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    NzTreeSelectModule,
    ReactiveFormsModule,
    FormsModule,
    TreeModule,
    NgbModule,
    FonctionnaireRoutingModule
  ],
})
export class FonctionnaireModule { }
