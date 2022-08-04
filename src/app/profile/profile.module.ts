import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { AdminModule } from './admin/admin.module';
import { DecideurModule } from './decideur/decideur.module';
import { UserModule } from './user/user.module';
import { AdminStructureModule } from './admin-structure/admin-structure.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AdminModule,
    DecideurModule,
    UserModule,
    AdminStructureModule
  ]

})
export class ProfileModule { }
