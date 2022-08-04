import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FonctionnairesService } from 'src/app/shared/services/fonctionnaire/fonctionnaires.service';
import { StructuresService } from 'src/app/shared/services/structure/structures.service';
import { FonctionnaireDto } from 'src/app/shared/models/fonctionnaire/fonctionnaire-dto.model';
import { StructureDto } from 'src/app/shared/models/structure/structure-dto.model';
import { StructureVO } from 'src/app/shared/models/structure/structure-vo.model';
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
  heading: any = "Gestion des Fonctionnaires";
  subheading: any = "Affichage de la liste des fonctionnaires";
  public listFonctionnaires: FonctionnaireDto[];
  notFoundMessage: any;
  Fonctionnaire: FonctionnaireDto;
  Idreq: IdRequest;
  selectedstructbykey: any;
  selectedstruct: any;
  selectedorg: any;
  getlistfonctionnaires: any;
  structure: StructureDto;
  listStructure: StructureDto[];
  Subtree: StructureVO;
  Fulltree: StructureVO;
  expandKeys = ['100', '1001'];
  value?: string;
  nodes = [];
  private _fonctionnaireLstSubscription: Subscription;
  private _delfonctionnaireByIdSubscription: Subscription;
  private _subtreeSubscription: Subscription;
  private _FulltreeSubscription: Subscription;
  private _StructureByKeySubscription: Subscription;
  constructor(
    private fonctionnaireservice: FonctionnairesService,
    private structureservice: StructuresService,
    private router: Router,
    private notifyService: NotificationService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.value = '1001';
    }, 1000);
    this.initsubtree();
    this.initListFonctionnaire(0, true);
  }

  initListFonctionnaire(id, isorg) {
    let req = new IdRequest(id, null, null);
    if (isorg) {
      this.getlistfonctionnaires = this.fonctionnaireservice.getFonctionnairesByOrganismeId(req);
    }
    else {
      this.getlistfonctionnaires = this.fonctionnaireservice.getFonctionnairesByStructureId(req);
    }
    this._fonctionnaireLstSubscription = this.getlistfonctionnaires.subscribe(
      res => {
        console.log("liste des fonctionnaires", res);
        this.listFonctionnaires = res;

        console.log('**** liste fonctionnaires ', this.listFonctionnaires);


        if (this.listFonctionnaires.length > 1) {

        }

        if (this.listFonctionnaires.length <= 1) {

          this.notFoundMessage = 'pas de resultat, la liste est vide';

        }
      },
      error => {
        console.log(error);

        this.notFoundMessage = 'pas de resultat, la liste est vide';


        this.notifyService.showError("Liste des fonctionnaires", "Erreur !!");
      }
    );
  }


  initsubtree() {
    this._subtreeSubscription = this.structureservice.getSubtree().subscribe(
      res => {
        console.log("subtree", res);
        this.Subtree = res;
        this.nodes.push(this.Subtree);
      },
      error => {
        console.log(error);
        this.notifyService.showError("Erreur ??", "Chargement de la liste des sous structure");
      }
    );
  }

  getnode(reqId: IdRequest) {

    this._StructureByKeySubscription = this.structureservice.getStructureByKey(reqId).subscribe(
      res => {
        console.log("get structure by key", res);
        this.structure = res;
        if (Object.keys(this.structure).length != 0) {
          this.selectedstruct = this.structure.id;
          this.selectedorg = this.structure.orgId;
          console.log("structureid", this.selectedstruct);
          if (this.structure.type.isorganisme)
            this.initListFonctionnaire(this.selectedorg, true);
          else
            this.initListFonctionnaire(this.selectedstruct, false);
        }
      },
      error => {
        console.log(error);
        this.notifyService.showError("detail de la structure", "Erreur !!");
      }
    )

  }


  deletfonctionnaire(id) {

    Swal.fire({
      title: 'vérifier avant',
      text: 'confirmer la suppression du fonctionnaire',
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

        this._delfonctionnaireByIdSubscription = this.fonctionnaireservice.deleteFonctionnaires(id).subscribe(
          res => {
            console.log("delete fonctionnaire", res);
            this.notifyService.showSuccess("supression du fonctionnaire", "Succées !!");
            //this.router.navigate(['/profile/admin/structure']);
            this.router.navigateByUrl('/ListeComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['profile/admin/fonctionnaire']);
            });
          },
          error => {
            console.log(error);
            this.notifyService.showError("supression du fonctionnaire", "Erreur !!");
          }
        )


      }

    })


  }


  onChange($event: string): void {
    console.log("treeselect", $event);
    this.selectedstructbykey = $event;
    if ($event != undefined && $event != '1001') {
      let keyval = parseInt(this.selectedstructbykey);
      let req = new IdRequest(null, keyval, null);
      this.getnode(req);
    }
  }



  ngOnDestroy() {

    if (this._subtreeSubscription != null) {
      this._subtreeSubscription.unsubscribe();
    }
    if (this._FulltreeSubscription != null) {
      this._FulltreeSubscription.unsubscribe();
    }
    if (this._StructureByKeySubscription != null) {
      this._StructureByKeySubscription.unsubscribe();
    }
    if (this._fonctionnaireLstSubscription != null) {
      this._fonctionnaireLstSubscription.unsubscribe();
    }
    if (this._delfonctionnaireByIdSubscription != null) {
      this._delfonctionnaireByIdSubscription.unsubscribe();
    }

  }

}
