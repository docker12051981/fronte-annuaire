import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurService } from 'src/app/shared/services/contrat/fournisseur.service';
import { FournisseurDto } from 'src/app/shared/models/contrat/fournisseur-dto.model';
import { IdRequest } from '../../../../shared/models/request/idrequest.model';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/shared/services/plugins/notification.service';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {
  heading: any = "Liste des Fournisseurs";
  subheading: any = "Espace Admin permet d'afficher la liste des fournisseurs";
  public listFournisseurs: FournisseurDto[];
  notFoundMessage: any;
  Fournisseur: FournisseurDto;
  Idreq: IdRequest;
  getlistfournisseures: any;

  private _fournisseurLstSubscription: Subscription;
  private _delfournisseurByIdSubscription: Subscription;
  constructor(
    private fournisseurservice: FournisseurService,
    private router: Router,
    private notifyService: NotificationService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initListFournisseur(0);
  }

  initListFournisseur(id) {
    let req = new IdRequest(id, null, null);
    this._fournisseurLstSubscription = this.fournisseurservice.getFournisseurs().subscribe(
      res => {
        console.log("liste des fonctionnaires", res);
        this.listFournisseurs = res;
        console.log('**** liste fournisseur ', this.listFournisseurs);
        if (this.listFournisseurs.length > 1) {
        }

        if (this.listFournisseurs.length <= 1) {
          this.notFoundMessage = 'pas de resultat, la liste est vide';
        }
      },
      error => {
        console.log(error);
        this.notFoundMessage = 'pas de resultat, la liste est vide';
        this.notifyService.showError("Liste des fournisseurs", "Erreur !!");
      }
    );
  }

  deletfournisseur(id) {
    Swal.fire({
      title: 'vérifier avant',
      text: 'confirmer la suppression de fournisseur',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Annuler',
      allowEnterKey: true,
      reverseButtons: true,
      focusCancel: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.value) {
        this._delfournisseurByIdSubscription = this.fournisseurservice.deleteFournisseur(id).subscribe(
          res => {
            console.log("delete fournisseur", res);
            this.notifyService.showSuccess("supression du fournisseur", "Succées !!");
            this.router.navigateByUrl('/ListeComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['profile/admin-structure/fournisseur']);
            });
          },
          error => {
            console.log(error);
            this.notifyService.showError("supression de fournisseur", "Erreur !!");
          }
        )
      }
    })
  }

  ngOnDestroy() {
    if (this._fournisseurLstSubscription != null) {
      this._fournisseurLstSubscription.unsubscribe();
    }
    if (this._delfournisseurByIdSubscription != null) {
      this._delfournisseurByIdSubscription.unsubscribe();
    }
  }
}
