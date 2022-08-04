import { Component, OnInit } from '@angular/core';
import { NatureService } from 'src/app/shared/services/contrat/nature.service';
import { TypeService } from 'src/app/shared/services/contrat/type.service';
import { NatureDto } from 'src/app/shared/models/contrat/nature-dto.model';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';
import { SmartFormsComponent } from 'src/app/shared/components/smart-forms/smart-forms/smart-forms.component';
import { SmartFormsLtrComponent } from 'src/app/shared/components/smart-forms/smart-forms-ltr/smart-forms-ltr.component';
import { SmartSelectSimpleComponent } from 'src/app/shared/components/smart-forms/smart-select-simple/smart-select-simple.component';
import { SmartCustomFilterLtrComponent } from 'src/app/shared/components/smart-forms/smart-custom-filter-ltr/smart-custom-filter-ltr.component';
import { SmartSecondCustomFilterComponent } from 'src/app/shared/components/smart-forms/smart-second-custom-filter/smart-second-custom-filter.component';
import { SmartCategorieRenderSimpleComponent } from 'src/app/shared/components/smart-forms/smart-categorie-render-simple/smart-categorie-render-simple.component';
import { SmartactionService } from 'src/app/shared/services/plugins/smartaction.service';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { TypeDto } from 'src/app/shared/models/contrat/type-dto.model';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {
  public listsousType: NatureDto[];
  sousType: NatureDto;
  mysettings: any;
  settings: any; œ
  showfilter: boolean = false;
  showactions: boolean = false;
  layout: string;
  notFoundMessage: any;
  source: LocalDataSource;
  datalist: any;
  listType: TypeDto[]
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
  private _soustypeLstSubscription: Subscription;
  private _soustypeAddSubscription: Subscription;
  private _soustypeUpdSubscription: Subscription;
  private _soustypeDelSubscription: Subscription;
  private _onChangedSubscription: Subscription;
  private _typeLstSubscription: Subscription;
  constructor(private smartaction: SmartactionService,
    private soustypeservice: NatureService,
    private typeservice: TypeService,
    private sharedService: SharedService
  ) {

    this.source = new LocalDataSource(this.listsousType);
    this.showfilter = false;
    this.showactions = false;
    this.notFoundMessage = 'Erreur affichage de la list';
    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);
  }

  private _soustypesSubscription: Subscription;
  ngOnInit() {

    /** init type of contrat */
    this.getListType();
    this.initListsousType();
    this.showactions = false;
    this.showfilter = false;
    this.titleaction = 'Actions';
    this.noDataFound = 'pas de type trouvé';
    this._sharedListSubscription = this.sharedService.sharedList.subscribe(data => this.datalist = data);
    this._sharedTextSubscription = this.sharedService.sharedText.subscribe(data => this.defaulttextlist = data);
    this._sharedcustomfilterSubscription = this.sharedService.sharedcustomfilter.subscribe(data => this.datafilter = data);

    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);
    this.source = new LocalDataSource(this.listsousType);
  }

  deletesousType(req: any) {

    console.log("deleted", req);
    this._soustypeDelSubscription = this.soustypeservice.deleteNatures(req).subscribe(
      res => {
        console.log("suppression de nature de contrat" + res)
        /*  this.msg.success_delete_notify(this.translateService.instant('success delete key word'));
          this.msg.successparam_console(this.translateService.instant('success delete key word'));*/
        this.initListsousType();

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
        this.initListsousType();
      });
  }

  onCreateConfirm(event) {
    this.sousType = new NatureDto();

    this.sousType.lib_fr = event.newData.lib_fr;
    this.sousType.typecontrat = {
      id: event.newData.type,
      lib_fr: null
    };

    console.log("nature", this.sousType);
    console.log("row nature type", event.newData.type);
    if ((this.sousType.lib_fr == null) || (this.sousType.typecontrat == null)) {
      Swal.fire(
        'tous les champs sont obligatoires',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }


    this._soustypeAddSubscription = this.soustypeservice.addNatures(this.sousType).subscribe(


      res => {
        console.log('ajout de nature de contrat', res);
        // this.msg.success_add_notify(this.translateService.instant('success add mot cle'));
        // this.msg.successparam_console(this.translateService.instant('success add mot cle'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListsousType();
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

    this.sousType = new NatureDto();
    this.sousType.id = event.newData.id;
    this.sousType.lib_fr = event.newData.lib_fr;
    this.sousType.typecontrat = event.newData.type;

    if (this.sousType.lib_fr == "" || this.sousType.lib_fr == null || this.sousType.typecontrat == null) {

      Swal.fire(
        'tous les champs sont obligatoires',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;

    }

    this._soustypeUpdSubscription = this.soustypeservice.updateNatures(this.sousType).subscribe(
      res => {
        console.log("update nature de contrat")
        // this.msg.success_update_notify(this.translateService.instant('success update key word'));
        // this.msg.successparam_console(this.translateService.instant('success update key word'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListsousType();
      },
      error => {
        console.log(error);
        //this.msg.error_update_notify(this.translateService.instant('cannot update key word'));
        //this.msg.errorparam_console(this.translateService.instant('cannot update key word'));
      }
    );
  }


  onDeleteConfirm(event): void {
    console.log("Delete Event In Console", event.data);
    let soustypereq: IdRequest;
    soustypereq = new IdRequest(event.data.id, null, null);
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
        this.deletesousType(soustypereq.id)
        event.confirm.resolve();
        this.smartaction.tooltipeAction(); // call generate tooltipe after delete
      }

    })

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
        perPage: 10
      },
      columns: {

        lib_fr: {
          title: 'Nature Contrat',
          width: '40%',
          filter: true,
          type: 'html',
          required: true,
          class: 'required'

        },

        type: {
          title: 'Catégories Contrat',
          // type: 'html',
          width: '40%',
          required: true,

          class: 'required',
          filter: {
            type: 'custom',
            component: SmartSecondCustomFilterComponent
          },
          type: 'custom',
          renderComponent: SmartCategorieRenderSimpleComponent, /* data view component for theme */

          editor: {
            type: 'custom',
            component: SmartSelectSimpleComponent, /* simple dropdown component */
          }

        }

      },
      attr: {
        class: 'table table-bordered',
        class2: 'ng-default-Value',
        class1: 'ng-default-key',
      }
    };

  };


  initListsousType() {

    this._soustypeLstSubscription = this.soustypeservice.getNatures().subscribe(
      res => {
        console.log("liste", res);
        this.listsousType = res;

        this.notFoundMessage = 'pas de resultat, la liste est vide',
          console.log('**** natures des contrat ', this.listsousType);

        this.source = new LocalDataSource(this.listsousType);
        this._onChangedSubscription = this.source.onChanged().subscribe((change) => {
          //this.newList(); // call shared service for update simple select data when smarttable changed his status
          if (change.action === 'filter') {
            this.smartaction.tooltipeAction(); // call generate tooltipe on filter renderer  
          }
        });
        this.smartaction.tooltipeAction();
        if (this.listsousType.length > 1) {
          this.showfilter = true;
          this.showactions = true;
          this.titleaction = 'Actions';
          // this.sharedService.sendcustomfilter(true);
          this.initSettingsTable();
          /** use mysettings in smart table (filter=true)*/
          this.settings = Object.assign({}, this.mysettings);
        }

        if (this.listsousType.length <= 1) {
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
        this.noDataFound = 'Erreur affichage de la liste des types';
        this.initSettingsTable();
        this.settings = Object.assign({}, this.mysettings);
        // this.msg.errorparam_console(this.translateService.instant('System error'));
        // this.msg.error_add_notify(this.translateService.instant('Error showing list'));
      }
    );
  }

  getListType() {
    this._typeLstSubscription = this.typeservice.getTypes().subscribe(
      res => {
        this.listType = res;
        console.log('**** list types', this.listType);
        this.defaulttextlist = 'choisir la catégorie';
        this.listType.forEach(element => {
          this.list.push({ 'value': element.id, 'title': element.lib_fr });
        });
        console.log("karim newlist type contrat", this.list);
        this.newList(); // call shared service for update simple select data when smarttable changed his status
      },
      error => {
        console.log(error);
        //this.msg.errorparam_console(this.translateService.instant('System error'));
        //this.msg.error_add_notify(this.translateService.instant('Error showing list'));

      });
  }

  /**
  * methode to caller for set value in shared service  used by any components has simple liste 
  * @author Hmedi Karim
  */

  newList() {
    this.sharedService.simpledatalist(this.list);
    this.sharedService.textlist(this.defaulttextlist);

    console.log("new list", this.list);
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

    if (this._soustypeLstSubscription != null) {
      this._soustypeLstSubscription.unsubscribe();
    }

    if (this._soustypeAddSubscription != null) {
      this._soustypeAddSubscription.unsubscribe();
    }

    if (this._soustypeUpdSubscription != null) {
      this._soustypeUpdSubscription.unsubscribe();
    }

    if (this._soustypeDelSubscription != null) {
      this._soustypeDelSubscription.unsubscribe();
    }

    if (this._onChangedSubscription != null) {
      this._onChangedSubscription.unsubscribe();
    }

    if (this._typeLstSubscription != null) {
      this._typeLstSubscription.unsubscribe();
    }


  }

}
