import { Observable, throwError } from 'rxjs';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../services/auth/authentication.service';
import { tap, catchError } from "rxjs/operators";
import { konsole } from 'src/app/shared/plugins/konsole';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {

    }


    handleError(error: HttpErrorResponse) {

        try {

            konsole.error('خطأ في المنظومة'); /* generique error in console */

        } catch (e) {
            konsole.error('خطأ في المنظومة');
        }

        return throwError(error);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = localStorage.getItem('currentUser');
        // let configFront = (JSON.parse(localStorage.getItem('config')));
        let language;
        /* if (configFront) {
             language = configFront.lang;
 
         } else {
             language = "ar";
         }
 */
        if (currentUser) {
            request = request.clone({

                headers: new HttpHeaders({
                    'Authorization': `Bearer ${currentUser}`,

                })




            });


            return next.handle(request).pipe(catchError(this.handleError),
                tap(event => {
                    if (event instanceof HttpResponse) {
                        // do stuff with response if you want
                        /// {"jwttoken":"
                        if (!event.url.startsWith("http://localhost:4200")) {
                            let newToken = event.headers.get('Authorization');

                            if (newToken) {
                                let data = {
                                    "token": newToken
                                }

                                localStorage.setItem('currentUser', data.token);

                            } else {
                                console.log("************Error Refresh Token*#################")
                                console.log(event);
                                console.log(event.url.startsWith("http://localhost:4200"));

                            }
                        }

                    }

                }));





        } else {
            let header = request.clone(
                {
                    headers: request.headers.set('Accept', 'application/json')

                }
            )
            return next.handle(header).pipe(
                tap(evt => {
                    if (evt instanceof HttpResponse) {
                        if (this.authenticationService.islogedin === true) {
                            localStorage.setItem('currentUser', evt.headers.get('Authorization'));

                        }

                    }

                }));
        }
    }
}
