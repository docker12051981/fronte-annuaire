import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClasseDto } from '../../models/fonctionnaire/classe.model';
import { IdRequest } from '../../models/request/idrequest.model';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  classes: Observable<ClasseDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getClasses(): Observable<ClasseDto[]> {
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/classes/`);
  }

  addClasses(Classes: ClasseDto): Observable<ClasseDto[]> {
    return this.http.post<any>(`${environment.gateway}/fonctionnaires/classe/add`, Classes);
  }

  updateClasses(Classes: ClasseDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/fonctionnaires/classes/`+Classes.id,Classes);
  }

  deleteClasses(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/fonctionnaires/classes/` + idreq);
  }

}
