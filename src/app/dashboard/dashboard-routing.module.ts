import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './home/admin/admin.component';
import { AdminStructureComponent } from './home/admin-structure/admin-structure.component';
import { UserComponent } from './home/user/user.component';
import { DecideurComponent } from './home/decideur/decideur.component';
import { SeletComponent } from './options/selet/selet.component';
import { AuthentificationGuard } from 'src/app/shared/services/auth/authentification.guard';
import { JwtHelperService } from "@auth0/angular-jwt";


let routerto = "login";
if (localStorage.getItem('currentUser') !== null) {

  console.log(localStorage.getItem('currentUser'));
  let token = localStorage.getItem('currentUser');
  let helper = new JwtHelperService();
  let decodedToken = helper.decodeToken(token);

  if (decodedToken.role == "ADMIN_CENTRAL") {
    routerto = "admin";
  }
  if (decodedToken.role == "ADMIN_STRUCTURE") {
    routerto = "admin-struct";
  }
  if (decodedToken.role == "SIMPLE_USER") {
    routerto = "user";
  }
}

const routes: Routes = [

  {
    path: 'admin',
    data: {

      roles: ["ADMIN_CENTRAL"], extraParameter: 'dashboardsMenu'

    },
    component: AdminComponent, canActivate: [AuthentificationGuard]
  },

  {
    path: 'admin/:codecat/select',
    data: {

      roles: ["ADMIN_CENTRAL"], extraParameter: 'dashboardsMenu'

    },
    component: SeletComponent, canActivate: [AuthentificationGuard],
  },

  {
    path: 'admin-struct',
    data: {

      roles: ["ADMIN_STRUCTURE"], extraParameter: 'dashboardsMenu'

    },
    component: AdminStructureComponent, canActivate: [AuthentificationGuard]
  },

  {
    path: 'admin-struct/:codecat/select',
    data: {

      roles: ["ADMIN_STRUCTURE"], extraParameter: 'dashboardsMenu'

    },
    component: SeletComponent, canActivate: [AuthentificationGuard],
  },

  {
    path: 'user',
    data: {

      roles: ["SIMPLE_USER"], extraParameter: 'dashboardsMenu'

    },
    component: UserComponent, canActivate: [AuthentificationGuard]
  },
  {
    path: 'decideur',
    component: DecideurComponent
  },


  { path: '', redirectTo: routerto, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
