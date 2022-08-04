import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContratDto } from '../../models/contrat/contrat-dto.model';
import { ContratVO } from '../../models/contrat/contrat-vo.model';
import { IdRequest } from '../../models/request/idrequest.model';
import { DecodageTokenService } from 'src/app/shared/services/auth/decodage-token.service';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  contrats: Observable<ContratDto[]>;
  noderootcontrat: any;
  constructor(private http: HttpClient, private router: Router, private decodagetokenService: DecodageTokenService) {
  }

  getContrats(): Observable<ContratDto[]> {
    return this.http.get<any>(`${environment.gateway}/contrats/organisme/` + this.decodagetokenService.getOrganismeUserToken());
  }

  getSubtree(): Observable<ContratVO> {
    if (this.decodagetokenService.getRoleUserToken() == "ADMIN_STRUCTURE") {
      this.noderootcontrat = "0";
    }

    return this.http.get<any>(`${environment.gateway}/contrats/node/1/st/` + this.noderootcontrat);
  }

  addContrats(Contrat: ContratDto): Observable<ContratDto[]> {
    return this.http.post<any>(`${environment.gateway}/contrats/`, Contrat);
  }

  updateContrat(Contrat: ContratDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/contrats/` + Contrat.id, Contrat);
  }

  deleteContrat(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/contrats/` + idreq);
  }

  getContratById(idreq: any): Observable<ContratDto> {
    return this.http.get<any>(`${environment.gateway}/contrats/` + idreq.id);
  }

  getContratByKey(idreq: any): Observable<ContratDto> {
    return this.http.get<any>(`${environment.gateway}/contrats/nodeId/` + idreq.key);
  }

  mouveContrat(req: IdRequest): Observable<any> {
    console.log("service", req);
    var parentid: string = req.parentid.toString();
    var key: string = req.key.toString();
    let params = new HttpParams();
    params.set('newParentNodeId', parentid);
    return this.http.put<any>(`${environment.gateway}/contrats/node/1/` + key + '?newParentNodeId=' + req.parentid,
      { params });
  }

}
