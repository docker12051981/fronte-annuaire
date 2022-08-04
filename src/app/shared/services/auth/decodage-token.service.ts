import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

/**
 * Token Utils
 */

export class DecodageTokenService {

  jwtHelper: any;
  currentUser: any;
  token: any;
  helper: any;
  decodedToken: any;
  currentYear: any;
  error = '';
  pathprofile: string = "";
  roleprofile: string = "";
  profile: string;
  constructor(private authenticationService: AuthenticationService, private router: Router) {

    this.jwtHelper = JwtHelperService;
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser != null) {
      this.token = this.currentUser;
      //alert("befor" + this.token);
    }
    this.helper = new JwtHelperService();
    this.decodedToken = this.helper.decodeToken(this.token);
    console.log("decodedToken", this.decodedToken);
    if (this.decodedToken) {
      // alert("after" + this.decodedToken.sub);
      console.log("after", this.decodedToken.sub);

    }
    else {

    }
  }

  getUserToken() {
    if (this.currentUser != null) {
      return (this.decodedToken.sub);
    }
  }


  getOrganismeUserToken(): string {
    if (this.currentUser != null) {
      return (this.decodedToken.organisme);
    }
  }

  getRoleUserToken(): string {

    if (this.currentUser != null) {
      console.log("role token", this.decodedToken.role)

      switch (this.decodedToken.role) {
        case "ADMIN_CENTRAL":
          this.profile = "Administrateur Central";
          break;
        case "ADMIN_STRUCTURE":
          this.profile = "Administrateur de Structure";
          break;
        case "SIMPLE_USER":
          this.profile = "Utilisateur Simple";

      }

      return (this.decodedToken.role);
    }
  }

  getRolebyUserToken() {

    if (this.getRoleUserToken() == "ADMIN_CENTRAL") {
      this.pathprofile = "admin";
    }
    if (this.getRoleUserToken() == "ADMIN_STRUCTURE") {
      this.pathprofile = "admin-struct";
    }

    if (this.getRoleUserToken() == "SIMPLE_USER") {
      this.pathprofile = "user";
    }
  }

  logout() {
    this.authenticationService.logout();
  }

  redirectuser() {
    if (this.getRoleUserToken() == "ADMIN_CENTRAL") {
      this.pathprofile = "admin";
    }
    if (this.getRoleUserToken() == "ADMIN_STRUCTURE") {
      this.pathprofile = "admin-struct";
    }

    if (this.getRoleUserToken() == "SIMPLE_USER") {
      this.pathprofile = "user";
    }
    return this.pathprofile;
  }


  getRoleToken() {
    let roles: string[] = [];
    if (this.currentUser != null) {
      roles.push(this.getRoleUserToken());
      /*  if (this.getISADMINCENTRALToken()=="ADMIN_CENTRAL") {
          roles.push(this.getISADMINCENTRALToken());
        }
        if (this.getISADMINSTRUCTUREToken()) {
          roles.push("ADMIN_STRUCTURE");
        }
        if (this.getISSIMPLEUSERToken()) {
          roles.push("SIMPLE_USER");
        }
        if (this.getISOPERATEURToken()) {
          roles.push("OPERATEUR");
        }*/

      console.log(roles);
      return roles;
    }

  }
  /*
    getNameToken(): string{
      if (this.currentUser != null) {
        return `${this.decodedToken.firstNameAr}`;
      }
    }
  */

  expiredToken() {
    /**
     *  this.helper.getTokenExpirationDate(this.token);
     *  */
    if (this.currentUser != null) {
      const isExpired = this.helper.isTokenExpired(this.token);
      return (isExpired);
    }
  }

}
