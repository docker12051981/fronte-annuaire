import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { UserDto } from '../../models/utilisateur/user-dto.model';
import { CredentialsDto } from 'src/app/shared/models/auth/credentials-dto.model';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserDto>;
  public currentUser: Observable<UserDto>;
  public islogedin = false;
  error = '';
  jwtHelper2: any;
  token2: any;
  helper2: any;
  decodedToken2: any;
  isoperateur: boolean;

  constructor(
    private http: HttpClient, private router: Router, private cookieService: CookieService,
  ) {

    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }



  login(data: CredentialsDto): Observable<CredentialsDto> {
    console.log("data", data);
    return this.http.post<any>(`${environment.gateway}/login/`, data)
      .pipe(map(user => {
        if (user) {
          alert("authentic" + user.token);
          // store user details and jwt token in local storage to keep user logged in between page refreshes       
          localStorage.setItem('currentUser', user.token);
          console.log("kajson" + JSON.stringify(user.token));
          this.currentUserSubject.next(user.token);
          this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
          this.currentUser = this.currentUserSubject.asObservable();

          if (localStorage.getItem('currentUser') != null) {

            location.reload();
            this.router.navigateByUrl('dashboard');
          }
          console.log("currentUserValue:" + JSON.stringify(this.currentUserValue));
          this.islogedin = true;

        }
        return user;
      }

      ),
        catchError(this.handleError('login', []))
      );

  }

  logout() {

    localStorage.clear();
    this.currentUserSubject.next(null);
    this.islogedin = false;
    location.reload();
    this.router.navigateByUrl('login');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}