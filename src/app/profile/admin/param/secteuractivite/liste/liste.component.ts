import { Component, OnInit } from '@angular/core';
import { SecteureactiviteService } from 'src/app/shared/services/structure/secteureactivite.service';
import { SecteureactiviteDto } from 'src/app/shared/models/structure/secteureactivite-dto.model';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';
import { SmartactionService } from 'src/app/shared/services/plugins/smartaction.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/plugins/notification.service';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {
  public listSecteur: SecteureactiviteDto[];
  Secteur: SecteureactiviteDto;
  mysettings: any;
  settings: any;
  showfilter: boolean = false;
  showactions: boolean = false;
  layout: string;
  notFoundMessage: any;
  source: LocalDataSource;
  datalist: any;
  datafng: any;
  defaulttextlist: string;
  list: any = [];
  defaultlist: any = [];
  datafilter: boolean;
  titleaction: any = 'Actions';
  noDataFound: any = 'pas de contenu trouvé';


  private _sharedcustomfilterSubscription: Subscription;
  private _sharedListSubscription: Subscription;
  private _sharedTextSubscription: Subscription;
  private _secteurLstSubscription: Subscription;
  private _secteurAddSubscription: Subscription;
  private _secteurUpdSubscription: Subscription;
  private _secteurDelSubscription: Subscription;
  private _onChangedSubscription: Subscription;
  constructor(private smartaction: SmartactionService,
    private secteuractiviteservice: SecteureactiviteService,
    private notifyService: NotificationService,
  ) {

    this.source = new LocalDataSource(this.listSecteur);
    this.showfilter = false;
    this.showactions = false;
    this.notFoundMessage = 'Erreur affichage de la list';
    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);

  }


  ngOnInit() {

    /** init secteur activite */
    this.initListSecteur();
    this.showactions = false;
    this.showfilter = false;
    this.titleaction = 'Actions';
    this.noDataFound = 'pas de contenu affiché';


    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);
    this.source = new LocalDataSource(this.listSecteur);
  }

  deleteSecteur(req: any) {

    this._secteurDelSubscription = this.secteuractiviteservice.deleteSecteureActivite(req).subscribe(
      res => {
        console.log("suppression de secteur activite" + res);
        this.notifyService.showSuccess("effectué avec succes !!", "Suppression de Secteur d'activité")
        this.initListSecteur();

      },
      error => {

        console.log(error)
        this.notifyService.showError("Erreur ??", "Suppresion de secteur d'activité");
        this.initListSecteur();
      });
  }

  onCreateConfirm(event) {
    console.log("test", event);
    this.Secteur = new SecteureactiviteDto();
    this.Secteur.code = event.newData.code;
    this.Secteur.lib_ar = event.newData.lib_ar;
    this.Secteur.lib_fr = event.newData.lib_fr;

    if ((this.Secteur.lib_ar == "") || (this.Secteur.lib_fr == "") || (this.Secteur.code == "")) {

      Swal.fire(
        'veuillez compléter les champs svp!',
        'OK',
        'error',
      );

      event.confirm.reject();
      return;
    }

    if ((this.Secteur.lib_ar == null) || (this.Secteur.lib_fr == null) || (this.Secteur.code == null)) {
      //alert("com");
      Swal.fire(
        'veuillez compléter les champs svp!',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }


    this._secteurAddSubscription = this.secteuractiviteservice.addSecteureActivite(this.Secteur).subscribe(
      res => {
        console.log('ajout de secteur activité', res);
        // this.msg.success_add_notify(this.translateService.instant('success add mot cle'));
        // this.msg.successparam_console(this.translateService.instant('success add mot cle'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.notifyService.showSuccess("effectué avec succes !!", "Ajout de Secteur d'activité");
        this.initListSecteur();

      },
      error => {

        console.log("exception" + JSON.stringify(error))
        this.notifyService.showError("Erreur  ??", "Ajout de Secteur d'activité")
      });


  }


  onUpdateConfirm(event): void {
    console.log("update Event In Console")
    console.log(event);

    this.Secteur = new SecteureactiviteDto();
    this.Secteur.id = event.newData.id;
    this.Secteur.lib_fr = event.newData.lib_fr;
    this.Secteur.lib_ar = event.newData.lib_ar;
    this.Secteur.code = event.newData.code;


    if (this.Secteur.lib_fr == "" || this.Secteur.lib_fr == null || this.Secteur.lib_ar == "" || this.Secteur.lib_ar == null || this.Secteur.code == "" || this.Secteur.code == null) {

      Swal.fire(
        'tous les champs sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;

    }

    this._secteurUpdSubscription = this.secteuractiviteservice.updateSecteureActivite(this.Secteur).subscribe(
      res => {
        console.log("update secteur activite")
        // this.msg.success_update_notify(this.translateService.instant('success update key word'));
        // this.msg.successparam_console(this.translateService.instant('success update key word'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.notifyService.showSuccess("effectué avec succes !!", "Mise à jour de secteur d'activité");
        this.initListSecteur();

      },
      error => {
        console.log(error);
        this.notifyService.showError("Erreur ??", "Modification de Secteur")

      }
    );
  }


  onDeleteConfirm(event): void {
    console.log("Delete Event In Console");
    let secteurreq: IdRequest;
    secteurreq = new IdRequest(event.data.id,null,null);
    console.log(event.data);
    console.log(event.newData);

    Swal.fire({
      title: 'vérifier avant',
      text: 'confirmer la suppression',
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
        this.deleteSecteur(secteurreq.id)
        event.confirm.resolve();
        this.smartaction.tooltipeAction(); // call generate tooltipe after delete
      }

    })

  }


  ngOnDestroy() {

    if (this._sharedcustomfilterSubscription != null) {
      this._sharedcustomfilterSubscription.unsubscribe();
    }

    if (this._sharedListSubscription != null) {
      this._sharedListSubscription.unsubscribe();
    }

    if (this._sharedTextSubscription != null) {
      this._sharedTextSubscription.unsubscribe();
    }

    if (this._secteurLstSubscription != null) {
      this._secteurLstSubscription.unsubscribe();
    }

    if (this._secteurAddSubscription != null) {
      this._secteurAddSubscription.unsubscribe();
    }

    if (this._secteurUpdSubscription != null) {
      this._secteurUpdSubscription.unsubscribe();
    }

    if (this._secteurDelSubscription != null) {
      this._secteurDelSubscription.unsubscribe();
    }

    if (this._onChangedSubscription != null) {
      this._onChangedSubscription.unsubscribe();
    }
  }


  initSettingsTable() {

    this.mysettings = {
      noDataMessage: this.notFoundMessage,
      mode: 'inline',
      hideSubHeader: false,
      add: {
        addButtonContent: '<span class="add font-icon-lg"><i class="fas fa-plus-circle text-primary"></i><span>',
        createButtonContent: '<span class="add-save" ><i class="fas fa-check text-success"></i></span>',
        cancelButtonContent: '<span class="add-cancel"><i class="fas fa-times text-danger"></i></span>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<span class="edit" ><i class="fas fa-pencil-alt text-primary" title="test4"></i><span>',
        saveButtonContent: '<span class="edit-save" ><i class="fas fa-check text-success"></i></span>',
        cancelButtonContent: '<span class="edit-cancel" (click)="test()"><i class="fas fa-times text-danger"></i></span>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<span class="delete"><i class="far fa-trash-alt  text-danger text-primary"></i></span>',
        confirmDelete: true,
      },
      actions: {
        columnTitle: this.titleaction,
        position: 'right',
        add: true,
        edit: true,
        delete: true,
      },
      pager: {
        display: true,
        perPage: 15
      },
      columns: {

        code: {
          title: 'Code',
          width: '20%',
          filter: true,
          type: 'html',

        },
        lib_fr: {
          title: 'Secteur',
          width: '40%',
          filter: true,
          type: 'html',

        },
        lib_ar: {
          title: 'النشاط',
          width: '40%',
          filter: true,
          type: 'html',
          valuePrepareFunction: (cell) => { return '<p class="text-right">' + cell + '</p>'; },
        },

      },
      attr: {
        class: 'table table-bordered',
        class2: 'ng-default-Value',
        class1: 'ng-default-key',
      }
    };

  };


  initListSecteur() {

    this._secteurLstSubscription = this.secteuractiviteservice.getSecteureActivite().subscribe(
      res => {
        console.log("liste", res);
        this.listSecteur = res;
        this.notFoundMessage = 'pas de resultat, la liste est vide',
          console.log('**** Secteur activite ', this.listSecteur);

        this.source = new LocalDataSource(this.listSecteur);
        this._onChangedSubscription = this.source.onChanged().subscribe((change) => {

          if (change.action === 'filter') {
            this.smartaction.tooltipeAction(); // call generate tooltipe on filter renderer  
          }
        });
        this.smartaction.tooltipeAction();
        if (this.listSecteur.length > 1) {
          this.showfilter = true;
          this.showactions = true;
          this.titleaction = 'Actions';
          // this.sharedService.sendcustomfilter(true);
          this.initSettingsTable();
          /** use mysettings in smart table (filter=true)*/
          this.settings = Object.assign({}, this.mysettings);
        }

        if (this.listSecteur.length <= 1) {
          /** use emptysettings in smart table (filter=false)*/

          this.showfilter = false;
          this.showactions = true;
          this.titleaction = 'Actions';
          // this.sharedService.sendcustomfilter(false);
          this.initSettingsTable();
          this.settings = Object.assign({}, this.mysettings);
        }
      },
      error => {
        console.log(error);
        this.showfilter = false;
        this.showactions = false;
        this.titleaction = 'Actions';
        this.noDataFound = 'Erreur affichage de la liste des secteurs';
        this.notifyService.showError("Erreur ??", "chargement de la liste des secteurs")
        this.initSettingsTable();
        this.settings = Object.assign({}, this.mysettings);
        // this.msg.errorparam_console(this.translateService.instant('System error'));
        // this.msg.error_add_notify(this.translateService.instant('Error showing list'));
      }
    );
  }



}
