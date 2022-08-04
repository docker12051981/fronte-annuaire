import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NatureDto } from '../../models/contrat/nature-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';
@Injectable({
  providedIn: 'root'
})
export class NatureService {

  natures: Observable<NatureDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getNatures(): Observable<NatureDto[]> {
    return this.http.get<any>(`${environment.gateway}/contrats/nature/all`);
  }

  getNaturesByType(idreq: IdRequest): Observable<NatureDto[]> {
    return this.http.get<any>(`${environment.gateway}/contrats/nature/type/`+idreq.id);
  }

  addNatures(Natures: NatureDto): Observable<NatureDto[]> {
    console.log("kkkkkkkkk", Natures);
    return this.http.post<any>(`${environment.gateway}/contrats/nature/add/`, Natures);
  }

  updateNatures(Natures: NatureDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/contrats/nature/update/` + Natures.id, Natures);
  }

  deleteNatures(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/contrats/nature/delete/` + idreq);
  }

}
