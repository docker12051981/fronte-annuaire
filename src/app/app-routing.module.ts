import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { AuthComponent } from 'src/app/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Error403Component } from './DemoPages/error-pages/error403/error403/error403.component';
import { AuthentificationGuard } from 'src/app/shared/services/auth/authentification.guard';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Role } from 'src/app/shared/models/enumeration/role.enum';
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [


      // Dashboads

      // { path: '', component: AnalyticsComponent, data: { extraParameter: 'dashboardsMenu' } },

      {
        path: 'dashboard',
        canActivate: [AuthentificationGuard],
        data: { roles: ["ADMIN_CENTRAL", "ADMIN_STRUCTURE", "SIMPLE_USER"] },
        loadChildren: () => import('src/app/dashboard/dashboard.module').then(mod => mod.DashboardModule)
      },
      {
        path: 'profile',
        canActivate: [AuthentificationGuard],
        data: {

          roles: ["ADMIN_CENTRAL", "ADMIN_STRUCTURE"]

        },
        loadChildren: () => import('src/app/profile/profile.module').then(mod => mod.ProfileModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      {
        path: 'error403',
        component: Error403Component, data: { extraParameter: 'dashboardsMenu' },
      },
      {
        path: 'login',
        component: LoginComponent, data: { extraParameter: 'dashboardsMenu' },
      },
      {
        path: 'register',
        component: RegisterComponent, data: { extraParameter: 'dashboardsMenu' },
      },

    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'legacy'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
