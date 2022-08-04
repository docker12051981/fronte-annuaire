import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../models/utilisateur/user-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  users: Observable<UserDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<any>(`${environment.gateway}/users/`);
  }

  getUsersByStructureId(idreq: IdRequest): Observable<UserDto[]> {
    console.log("karim users by structure", idreq.id);
    return this.http.get<any>(`${environment.gateway}/users/structureId/` + idreq.id);
  }

  getUsersByOrganismeId(idreq: IdRequest): Observable<UserDto[]> {
    console.log("karim users by organisme", idreq.id);
    return this.http.get<any>(`${environment.gateway}/users/organismeId/` + idreq.id);
  }



  addUsers(Users: UserDto): Observable<UserDto[]> {
    return this.http.post<any>(`${environment.gateway}/users/`, Users);
  }

  updateUsers(Users: UserDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/users/` + Users.id, Users);
  }

  deleteUsers(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/users/` + idreq);
  }

}
