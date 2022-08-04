import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FonctionDto } from '../../models/fonctionnaire/fonction-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';
@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  fonctions: Observable<FonctionDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getFonctions(): Observable<FonctionDto[]> {
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/fonctions/`);
  }

  addFonctions(Fonctions: FonctionDto): Observable<FonctionDto[]> {
    return this.http.post<any>(`${environment.gateway}/fonctionnaires/fonctions/add`, Fonctions);
  }

  updateFonctions(Fonctions: FonctionDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/fonctionnaires/fonctions/` + Fonctions.id, Fonctions);
  }

  deleteFonctions(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/fonctionnaires/fonctions/` + idreq);
  }

}
