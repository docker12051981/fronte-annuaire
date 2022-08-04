import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TypeDto } from '../../models/structure/type-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';
@Injectable({
  providedIn: 'root'
})
export class TypeService {

  types: Observable<TypeDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getTypes(): Observable<TypeDto[]> {
    return this.http.get<any>(`${environment.gateway}/structures/type/all`);
  }

  addTypes(Types: TypeDto): Observable<TypeDto[]> {
    return this.http.post<any>(`${environment.gateway}/structures/type/add/`, Types);
  }

  updateTypes(Types: TypeDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/structures/type/update/`+Types.id,Types);
  }

  deleteTypes(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/structures/type/delete/` + idreq);

  }

}
