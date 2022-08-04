import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DiplomeDto } from '../../models/fonctionnaire/diplome.model';
import { IdRequest } from '../../models/request/idrequest.model';
@Injectable({
  providedIn: 'root'
})
export class DiplomeService {

  diplomes: Observable<DiplomeDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getDiplomes(): Observable<DiplomeDto[]> {
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/diplomes/`);
  }

  addDiplomes(Diplomes: DiplomeDto): Observable<DiplomeDto[]> {
    return this.http.post<any>(`${environment.gateway}/fonctionnaires/diplome/add`, Diplomes);
  }

  updateDiplomes(Diplomes: DiplomeDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/fonctionnaires/diplomes/` + Diplomes.id, Diplomes);
  }

  deleteDiplomes(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/fonctionnaires/diplomes/` + idreq);
  }

}
