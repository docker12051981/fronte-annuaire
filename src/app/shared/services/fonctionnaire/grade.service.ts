import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GradeDto } from '../../models/fonctionnaire/grade-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';
@Injectable({
  providedIn: 'root'
})
export class GradeService {

  grades: Observable<GradeDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getGrades(): Observable<GradeDto[]> {
    return this.http.get<any>(`${environment.gateway}/fonctionnaires/grades/`);
  }

  addGrades(Grades: GradeDto): Observable<GradeDto[]> {
    return this.http.post<any>(`${environment.gateway}/fonctionnaires/grades/add`, Grades);
  }

  updateGrades(Grades: GradeDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/fonctionnaires/grades/` + Grades.id, Grades);
  }

  deleteGrades(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/fonctionnaires/grades/` + idreq);
  }

}
