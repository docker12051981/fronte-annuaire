import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StructureDto } from '../../models/structure/structure-dto.model';
import { StructureVO } from '../../models/structure/structure-vo.model';
import { IdRequest } from '../../models/request/idrequest.model';
import { DecodageTokenService } from 'src/app/shared/services/auth/decodage-token.service';

@Injectable({
  providedIn: 'root'
})
export class StructuresService {
  structures: Observable<StructureDto[]>;
  organisme: any;
  constructor(private http: HttpClient, private router: Router, private decodagetokenService: DecodageTokenService) {

  }


  getStructures(): Observable<StructureDto[]> {
    return this.http.get<any>(`${environment.gateway}/structures/`);
  }

  getSubtree(): Observable<StructureVO> {
    if (this.decodagetokenService.getRoleUserToken() == "ADMIN_CENTRAL") {
      this.organisme = "1416307744";
    }
    if (this.decodagetokenService.getRoleUserToken() == "ADMIN_STRUCTURE") {
      this.organisme = this.decodagetokenService.getOrganismeUserToken();
    }
    return this.http.get<any>(`${environment.gateway}/structures/node/1/st/` + this.organisme);
  }

  geFulltree(): Observable<StructureVO> {
    return this.http.get<any>(`${environment.gateway}/structures/node/1`);
  }

  addStructures(Structure: StructureDto): Observable<StructureDto[]> {
    return this.http.post<any>(`${environment.gateway}/structures/node/`, Structure);
  }

  updateStructure(Structure: StructureDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/structures/` + Structure.id, Structure);
  }

  deleteStructure(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/structures/` + idreq);

  }

  getStructureById(idreq: any): Observable<StructureDto> {
    return this.http.get<any>(`${environment.gateway}/structures/` + idreq.id);
  }

  getStructureByKey(idreq: any): Observable<StructureDto> {
    return this.http.get<any>(`${environment.gateway}/structures/nodeId/` + idreq.key);

  }

  mouveStructure(req: IdRequest): Observable<any> {
    console.log("service", req);
    var parentid: string = req.parentid.toString();
    var key: string = req.key.toString();
    let params = new HttpParams();
    params.set('newParentNodeId', parentid);
    return this.http.put<any>(`${environment.gateway}/structures/node/1/` + key + '?newParentNodeId=' + req.parentid,
      { params });
  }

}
