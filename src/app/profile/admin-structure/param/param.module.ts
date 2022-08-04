import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeModule } from './type/type.module';
import { NatureModule } from './nature/nature.module';
import { ParamRoutingModule } from './param-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ParamRoutingModule,
    TypeModule,
    NatureModule
  ]
})
export class ParamModule { }
