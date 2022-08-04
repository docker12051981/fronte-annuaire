import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FournisseurDto } from '../../models/contrat/fournisseur-dto.model';
import { IdRequest } from '../../models/request/idrequest.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  fournisseurs: Observable<FournisseurDto[]>;
  constructor(private http: HttpClient, private router: Router,) { }

  getFournisseurs(): Observable<FournisseurDto[]> {
    return this.http.get<any>(`${environment.gateway}/contrats/fournisseur/all`);
  }

  getFournisseurByOrganisme(idreq: IdRequest): Observable<FournisseurDto[]> {
    console.log("organisme fournisseur", idreq.id);
    return this.http.get<any>(`${environment.gateway}/contrats/fournisseur/organisme` + idreq.id);
  }

  getFournisseurById(idreq: IdRequest): Observable<FournisseurDto> {
    console.log("karim fournisseur", idreq.id);
    return this.http.get<any>(`${environment.gateway}/contrats/fournisseur/` + idreq.id);
  }

  addFournisseurs(Fournisseur: FournisseurDto): Observable<FournisseurDto[]> {
    return this.http.post<any>(`${environment.gateway}/contrats/fournisseur/add/`, Fournisseur);
  }

  updateFournisseur(Fournisseur: FournisseurDto): Observable<any> {
    return this.http.put<any>(`${environment.gateway}/contrats/fournisseur/update/` + Fournisseur.id, Fournisseur);
  }

  deleteFournisseur(idreq: any): Observable<any> {
    return this.http.delete<any>(`${environment.gateway}/contrats/fournisseur/delete/` + idreq);
  }

}
