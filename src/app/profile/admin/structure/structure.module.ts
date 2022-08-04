import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { StructureRoutingModule } from './structure-routing.module';
import { SearchComponent } from './search/search.component';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import en from '@angular/common/locales/en';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';


registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
import { TreeModule } from '@circlon/angular-tree-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    SearchComponent,
    ListeComponent,
    DetailComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
    NgSelectModule,
    NzTreeSelectModule,
    ReactiveFormsModule,
    FormsModule,
    TreeModule,
    NgbModule
  ],


})
export class StructureModule { }
