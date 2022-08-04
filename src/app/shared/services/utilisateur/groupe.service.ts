import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GroupeDto } from '../../models/utilisateur/groupe-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';
@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  groupes: Observable<GroupeDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getGroupes(): Observable<GroupeDto[]> {
    return this.http.get<any>(`${environment.gateway}/users/group/all`);
  }

  getGroupeById(idreq: any): Observable<GroupeDto> {
    return this.http.get<any>(`${environment.gateway}/users/group/` + idreq);
  }

  addGroupes(Groupes: GroupeDto): Observable<GroupeDto[]> {
    console.log("karim groupe", Groupes);
    return this.http.post<any>(`${environment.gateway}/users/group/add/`, Groupes);
  }

  updateGroupes(Groupes: GroupeDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/users/group/update/` + Groupes.id, Groupes);
  }

  deleteGroupes(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/users/group/delete/` + idreq);
  }

}
