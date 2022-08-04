import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IdRequest } from '../../models/request/idrequest.model';
import { SecteureactiviteDto } from '../../models/structure/secteureactivite-dto.model';
@Injectable({
  providedIn: 'root'
})
export class SecteureactiviteService {

  secteuractivite: Observable<SecteureactiviteDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getSecteureActivite(): Observable<SecteureactiviteDto[]> {
    return this.http.get<any>(`${environment.gateway}/structures/secteureactivite/all`);
  }

  addSecteureActivite(secteuractivite: SecteureactiviteDto): Observable<SecteureactiviteDto[]> {
    return this.http.post<any>(`${environment.gateway}/structures/secteureactivite/add/`, secteuractivite);
  }

  updateSecteureActivite(secteuractivite: SecteureactiviteDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/structures/secteureactivite/update/` + secteuractivite.id, secteuractivite);
  }

  deleteSecteureActivite(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/structures/secteureactivite/delete/` + idreq);

  }

}
