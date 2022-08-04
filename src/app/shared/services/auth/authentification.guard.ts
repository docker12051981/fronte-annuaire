import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { DecodageTokenService } from './decodage-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private decodetoken: DecodageTokenService
  ) {



  }


  path()
  {
    return this.decodetoken.redirectuser();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.stringify(this.authenticationService.currentUserValue);
    const varia = 1;
    let hasRole = false;
   // alert(this.authenticationService.currentUserValue);
    if (currentUser != 'null') {

      let roles = this.decodetoken.getRoleToken();
      console.log("currentUser" + roles);

      roles.forEach(role => {

        if (route.data.roles && route.data.roles.includes(role)) {
          console.log("route.data.roles " + route.data.roles);
          hasRole = true;
        }

      });

      if (!hasRole) {
        this.router.navigate(['error403']);
      }
      return hasRole;

    }
    if (!currentUser || currentUser === 'null') {
      this.router.navigate(['login']);
      return false;
    }
  }



}