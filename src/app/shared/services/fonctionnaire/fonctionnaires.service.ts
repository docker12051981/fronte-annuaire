import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FonctionnaireDto } from '../../models/fonctionnaire/fonctionnaire-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';
import { UserstructVO } from '../../models/utilisateur/userstruct-vo.model';
@Injectable({
  providedIn: 'root'
})
export class FonctionnairesService {

  fonctionnaires: Observable<FonctionnaireDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getFonctionnaires(): Observable<FonctionnaireDto[]> {
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/`);
  }

  getFonctionnairesByStructureId(idreq: IdRequest): Observable<FonctionnaireDto[]> {
    console.log("karim structure", idreq.id);
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/structureId/` + idreq.id);
  }

  getFonctionnairesByOrganismeId(idreq: IdRequest): Observable<FonctionnaireDto[]> {
    console.log("karim organisme", idreq.id);
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/organismeId/` + idreq.id);
  }

  getUsersWithOrganismeByIdentifiant(idreq: IdRequest): Observable<UserstructVO> {
    console.log("karim users with organisme", idreq.id);
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/identifiant/` + idreq.id);
  }

  addFonctionnaires(Fonctionnaires: FonctionnaireDto): Observable<FonctionnaireDto[]> {
    return this.http.post<any>(`${environment.gateway}/fonctionnaires/`, Fonctionnaires);
  }

  updateFonctionnaires(Fonctionnaires: FonctionnaireDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/fonctionnaires/` + Fonctionnaires.id, Fonctionnaires);
  }

  deleteFonctionnaires(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/fonctionnaires/` + idreq);
  }

}
