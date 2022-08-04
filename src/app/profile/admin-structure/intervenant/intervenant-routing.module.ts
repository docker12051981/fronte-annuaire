import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
const routes: Routes = [{
  path: '',
  component: ListeComponent,
},
{
  path: 'liste',
  component: ListeComponent,
},
{
  path: 'detail/:id',
  component: DetailComponent
},
{
  path: 'create',
  component: CreateComponent
},];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntervenantRoutingModule { }
