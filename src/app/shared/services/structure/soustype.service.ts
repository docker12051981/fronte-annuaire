import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SoustypeDto } from '../../models/structure/soustype-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';

@Injectable({
  providedIn: 'root'
})
export class SoustypeService {

  types: Observable<SoustypeDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getsousTypes(): Observable<SoustypeDto[]> {
    return this.http.get<any>(`${environment.gateway}/structures/sous-type/all`);
  }

  getsousTypesBytype(idreq: any): Observable<SoustypeDto[]> {
    return this.http.get<any>(`${environment.gateway}/structures/sous-type/type/`+idreq);
  }


  addsousTypes(sousTypes: SoustypeDto): Observable<SoustypeDto[]> {
    return this.http.post<any>(`${environment.gateway}/structures/sous-type/add/`, sousTypes);
  }

  updatesousTypes(sousTypes: SoustypeDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/structures/sous-type/update/` + sousTypes.id, sousTypes);
  }

  deletesousTypes(idreq: any): Observable<any> {
    console.log(`${environment.gateway}/structures/sous-type/delete/` + idreq);
    return this.http.delete<any>(`${environment.gateway}/structures/sous-type/delete/` + idreq);

  }
}
