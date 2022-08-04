import { Component, OnInit } from '@angular/core';
import { DiplomeService } from 'src/app/shared/services/fonctionnaire/diplome.service';
import { DiplomeDto } from 'src/app/shared/models/fonctionnaire/diplome.model';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';
import { SmartactionService } from 'src/app/shared/services/plugins/smartaction.service';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {
  public listDiplome: DiplomeDto[];
  Diplome: DiplomeDto;
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
  private _diplomeLstSubscription: Subscription;
  private _diplomeAddSubscription: Subscription;
  private _diplomeUpdSubscription: Subscription;
  private _diplomeDelSubscription: Subscription;
  private _onChangedSubscription: Subscription;
  constructor(private smartaction: SmartactionService, private diplomeservice: DiplomeService) {

    this.source = new LocalDataSource(this.listDiplome);
    this.showfilter = false;
    this.showactions = false;
    this.notFoundMessage = 'Erreur affichage de la list';
    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);

  }


  ngOnInit() {

    /** init Classes */
    this.initListDiplome();
    this.showactions = false;
    this.showfilter = false;
    this.titleaction = 'Actions';
    this.noDataFound = 'pas de contenu affiché';

    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);
    this.source = new LocalDataSource(this.listDiplome);
  }

  deleteClasse(req: any) {

    this._diplomeDelSubscription = this.diplomeservice.deleteDiplomes(req).subscribe(
      res => {
        console.log("suppression de diplome" + res)
        /*  this.msg.success_delete_notify(this.translateService.instant('success delete key word'));
          this.msg.successparam_console(this.translateService.instant('success delete key word'));*/
        this.initListDiplome();

      },
      error => {
        /*if (error.code === ErrorEnum.DATA_INTEGRITY) {
          this.msg.error_delete_notify(error.message);
          this.msg.errorparam_console(this.translateService.instant(error.message));
        }
        else {*/
        console.log(error)
        //  this.msg.error_delete_notify(this.translateService.instant('cannot delete key word'));
        //  this.msg.errorparam_console(this.translateService.instant('cannot delete key word'));
        // }
        this.initListDiplome();
      });
  }

  onCreateConfirm(event) {
    this.Diplome = new DiplomeDto();
    this.Diplome.code = event.newData.code;
    this.Diplome.lib_ar = event.newData.lib_ar;
    this.Diplome.lib_fr = event.newData.lib_fr;

    if ((this.Diplome.lib_ar == "") || (this.Diplome.lib_fr == "")) {
      Swal.fire(
        'les deux diplomes en francais et en arabe sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }

    if ((this.Diplome.lib_ar == null) || (this.Diplome.lib_fr == null)) {
      Swal.fire(
        'les deux diplomes en francais et en arabe sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }


    this._diplomeAddSubscription = this.diplomeservice.addDiplomes(this.Diplome).subscribe(
      res => {
        console.log('ajout de diplome', res);
        // this.msg.success_add_notify(this.translateService.instant('success add mot cle'));
        // this.msg.successparam_console(this.translateService.instant('success add mot cle'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListDiplome();
      },
      error => {
        // console.log(error);
        // this.msg.error_add_notify(this.translateService.instant('cannot add mot cle'));
        // this.msg.errorparam_console(this.translateService.instant('cannot add mot cle'));
        console.log("exception" + JSON.stringify(error))
        /*
        if (error.code == ErrorEnum.ERROR_RESPONSE) {
          this.msg.errorparam_console(error.message);
          this.msg.error_add_notify(error.message);
        } else {
          this.msg.error_add_notify(this.translateService.instant('cannot add mot cle'));
          this.msg.error_console();
        }

        */
      });


  }


  onUpdateConfirm(event): void {
    console.log("update Event In Console")
    console.log(event);

    this.Diplome = new DiplomeDto();
    this.Diplome.id = event.newData.id;
    this.Diplome.code = event.newData.code;
    this.Diplome.lib_fr = event.newData.lib_fr;
    this.Diplome.lib_ar = event.newData.lib_ar;

    if (this.Diplome.lib_fr == "" || this.Diplome.lib_fr == null || this.Diplome.lib_ar == "" || this.Diplome.lib_ar == null) {

      Swal.fire(
        'les deux diplomes en francais et en arabe sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;

    }

    this._diplomeUpdSubscription = this.diplomeservice.updateDiplomes(this.Diplome).subscribe(
      res => {
        console.log("update diplome")
        // this.msg.success_update_notify(this.translateService.instant('success update key word'));
        // this.msg.successparam_console(this.translateService.instant('success update key word'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListDiplome();
      },
      error => {
        console.log(error);
        //this.msg.error_update_notify(this.translateService.instant('cannot update key word'));
        //this.msg.errorparam_console(this.translateService.instant('cannot update key word'));
      }
    );
  }


  onDeleteConfirm(event): void {
    console.log("Delete Event In Console");
    let diplomereq: IdRequest;
    diplomereq = new IdRequest(event.data.id, null, null);
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
        this.deleteClasse(diplomereq.id)
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

    if (this._diplomeLstSubscription != null) {
      this._diplomeLstSubscription.unsubscribe();
    }

    if (this._diplomeAddSubscription != null) {
      this._diplomeAddSubscription.unsubscribe();
    }

    if (this._diplomeUpdSubscription != null) {
      this._diplomeUpdSubscription.unsubscribe();
    }

    if (this._diplomeDelSubscription != null) {
      this._diplomeDelSubscription.unsubscribe();
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
          title: 'code',
          width: '20%',
          filter: true,
          type: 'html',
        },

        lib_fr: {
          title: 'Dérnier Diplome',
          width: '30%',
          filter: true,
          type: 'html',

        },
        lib_ar: {
          title: 'أخر شهادة علمية',
          width: '30%',
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


  initListDiplome() {

    this._diplomeLstSubscription = this.diplomeservice.getDiplomes().subscribe(
      res => {
        console.log("liste diplomes", res);
        this.listDiplome = res;
        this.notFoundMessage = 'pas de resultat, la liste est vide',
          console.log('**** liste Diplomes ', this.listDiplome);

        this.source = new LocalDataSource(this.listDiplome);
        this._onChangedSubscription = this.source.onChanged().subscribe((change) => {

          if (change.action === 'filter') {
            this.smartaction.tooltipeAction(); // call generate tooltipe on filter renderer  
          }
        });
        this.smartaction.tooltipeAction();
        if (this.listDiplome.length > 1) {
          this.showfilter = true;
          this.showactions = true;
          this.titleaction = 'Actions';
          // this.sharedService.sendcustomfilter(true);
          this.initSettingsTable();
          /** use mysettings in smart table (filter=true)*/
          this.settings = Object.assign({}, this.mysettings);
        }

        else if (this.listDiplome.length <= 1) {
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
        this.noDataFound = 'Erreur affichage de la liste des classes';
        this.initSettingsTable();
        this.settings = Object.assign({}, this.mysettings);
        // this.msg.errorparam_console(this.translateService.instant('System error'));
        // this.msg.error_add_notify(this.translateService.instant('Error showing list'));
      }
    );
  }

}
