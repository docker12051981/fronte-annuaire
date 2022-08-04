import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth/authentication.service';
//import { konsole } from 'src/app/shared/components/konsole';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                // auto logout if 401 response returned from api
                //  konsole.warn("**********" + err.status +" *********"+ request);
                this.authenticationService.logout();
                location.reload(true);
            }
            if (err.status === 400) {
                // if 400 
                console.log("**********" + err.status + " *********" + request);
                // konsole.warn("**********" + err.status +" *********"+ request);
            }
            return throwError(err.error);
        }))
    }
}