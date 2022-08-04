import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateursService } from 'src/app/shared/services/utilisateur/utilisateurs.service';
import { StructuresService } from 'src/app/shared/services/structure/structures.service';
import { UserDto } from 'src/app/shared/models/utilisateur/user-dto.model';
import { StructureDto } from 'src/app/shared/models/structure/structure-dto.model';
import { StructureVO } from 'src/app/shared/models/structure/structure-vo.model';
import { IdRequest } from '../../../../shared/models/request/idrequest.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/shared/services/plugins/notification.service';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {
  heading: any = "Gestion des Utilisateurs";
  subheading: any = "Affichage de la liste des utilisateurs";
  public listUsers: UserDto[];
  notFoundMessage: any = "";
  User: UserDto;
  Idreq: IdRequest;
  selectedstructbykey: any;
  selectedstruct: any;
  selectedorg: any;
  getlistusers: any;
  structure: StructureDto;
  listStructure: StructureDto[];
  Subtree: StructureVO;
  Fulltree: StructureVO;
  expandKeys = ['100', '1001'];
  value?: string;
  nodes = [];
  private _userLstSubscription: Subscription;
  private _deluserByIdSubscription: Subscription;
  private _subtreeSubscription: Subscription;
  private _FulltreeSubscription: Subscription;
  private _StructureByKeySubscription: Subscription;
  constructor(
    private userservice: UtilisateursService,
    private structureservice: StructuresService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.value = '1001';
    }, 1000);
    this.initsubtree();
    this.initListUser(0, true);
  }

  initListUser(id, isorg) {
    let req = new IdRequest(id, null, null);
    if (isorg) {
      this.getlistusers = this.userservice.getUsersByOrganismeId(req);
    }
    else {
      this.getlistusers = this.userservice.getUsersByStructureId(req);
    }
    this._userLstSubscription = this.getlistusers.subscribe(
      res => {
        console.log("liste des utilisateurs", res);
        this.listUsers = res;

        console.log('**** liste utilisateurs ', this.listUsers);


        if (this.listUsers.length > 1) {


        }

        if (this.listUsers.length <= 1) {

          this.notFoundMessage = 'pas de resultat, la liste des utilisateurs est vide';

        }
      },
      error => {
        console.log(error);

        this.notFoundMessage = 'pas de resultat, la liste des utilisateurs est vide';


        this.notifyService.showError("Liste des utilisateurs", "Erreur !!");
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
            this.initListUser(this.selectedorg, true);
          else
            this.initListUser(this.selectedstruct, false);
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
      text: 'confirmer la suppression de cette utilisateur',
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

        this._deluserByIdSubscription = this.userservice.deleteUsers(id).subscribe(
          res => {
            console.log("delete utilisateur", res);
            this.notifyService.showSuccess("supression de l'utilisateur", "Succées !!");
            //this.router.navigate(['/profile/admin/structure']);
            this.router.navigateByUrl('/ListeComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['profile/admin/utilisateur/']);
            });
          },
          error => {
            console.log(error);
            this.notifyService.showError("supression de l'utilisateur", "Erreur !!");
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
    if (this._userLstSubscription != null) {
      this._userLstSubscription.unsubscribe();
    }
    if (this._deluserByIdSubscription != null) {
      this._deluserByIdSubscription.unsubscribe();
    }

  }

}
