import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/shared/interceptor/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/shared/interceptor/error.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';

// BOOTSTRAP COMPONENTS

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// LAYOUT

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';


// HEADER

import { HeaderComponent } from './Layout/Components/header/header.component';
import { SearchBoxComponent } from './Layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './Layout/Components/header/elements/user-box/user-box.component';

// SIDEBAR

import { SidebarComponent } from './Layout/Components/sidebar/sidebar.component';
import { LogoComponent } from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './Layout/Components/footer/footer.component';

// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from './DemoPages/Dashboards/analytics/analytics.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileModule } from './profile/profile.module';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { SmartFormsComponent } from './shared/components/smart-forms/smart-forms/smart-forms.component';
import { SmartFormsLtrComponent } from './shared/components/smart-forms/smart-forms-ltr/smart-forms-ltr.component';
import { SmartSelectSimpleComponent } from './shared/components/smart-forms/smart-select-simple/smart-select-simple.component';
import { SmartCustomFilterLtrComponent } from './shared/components/smart-forms/smart-custom-filter-ltr/smart-custom-filter-ltr.component';
import { SmartSecondCustomFilterComponent } from './shared/components/smart-forms/smart-second-custom-filter/smart-second-custom-filter.component';
import { SmartCustomRenderSimpleComponent } from './shared/components/smart-forms/smart-custom-render-simple/smart-custom-render-simple.component';
import { PageTitleComponent } from './Layout/Components/page-title/page-title.component';
import { SharedService } from "src/app/shared/services/shared/shared.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Error403Component } from './DemoPages/error-pages/error403/error403/error403.component';
import { SmartCategorieRenderSimpleComponent } from './shared/components/smart-forms/smart-categorie-render-simple/smart-categorie-render-simple.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,

    // HEADER

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,

    // DEMO PAGES

    // Dashboards

    AnalyticsComponent,


    // User Pages


    AuthComponent,
    ErrorComponent,
    SmartFormsComponent,
    SmartFormsLtrComponent,
    SmartSelectSimpleComponent,
    SmartCustomFilterLtrComponent,
    SmartSecondCustomFilterComponent,
    SmartCustomRenderSimpleComponent,
    PageTitleComponent,
    LoginComponent,
    RegisterComponent,
    Error403Component,
    SmartCategorieRenderSimpleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    HttpClientModule,
    NgSelectModule,
    ToastrModule.forRoot(),

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Charts
    ChartsModule,
    DashboardModule,
    ProfileModule,
  ],


  providers: [
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ConfigActions,
    SharedService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
