import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/shared/services/structure/type.service';
import { TypeDto } from 'src/app/shared/models/structure/type-dto.model';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';
import { SmartactionService } from 'src/app/shared/services/plugins/smartaction.service';
import { SmartSelectSimpleComponent } from 'src/app/shared/components/smart-forms/smart-select-simple/smart-select-simple.component';
import { SmartCustomFilterLtrComponent } from 'src/app/shared/components/smart-forms/smart-custom-filter-ltr/smart-custom-filter-ltr.component';
import { SmartSecondCustomFilterComponent } from 'src/app/shared/components/smart-forms/smart-second-custom-filter/smart-second-custom-filter.component';
import { SmartCustomRenderSimpleComponent } from 'src/app/shared/components/smart-forms/smart-custom-render-simple/smart-custom-render-simple.component';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {
  public listType: TypeDto[];
  Type: TypeDto;
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
  private _typeLstSubscription: Subscription;
  private _typeAddSubscription: Subscription;
  private _typeUpdSubscription: Subscription;
  private _typeDelSubscription: Subscription;
  private _onChangedSubscription: Subscription;
  constructor(private smartaction: SmartactionService,
    private typeservice: TypeService,
    private sharedService: SharedService) {

    this.source = new LocalDataSource(this.listType);
    this.showfilter = false;
    this.showactions = false;
    this.notFoundMessage = 'Erreur affichage de la list';
    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);

  }


  ngOnInit() {

    /** init type of structure */
    this.initListType();
    this.newList();
    this.showactions = false;
    this.showfilter = false;
    this.titleaction = 'Actions';
    this.noDataFound = 'pas de contenu affiché';

    //this._sharedcustomfilterSubscription = this.sharedService.sharedcustomfilter.subscribe(data => this.datafilter = data);

    // this._sharedcustomfilterSubscription = this.sharedService.sharedcustomfilter.subscribe(data => this.datafilter = data);
    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);
    this.source = new LocalDataSource(this.listType);
  }

  deleteType(req: any) {

    this._typeDelSubscription = this.typeservice.deleteTypes(req).subscribe(
      res => {
        console.log("suppression de type" + res)
        /*  this.msg.success_delete_notify(this.translateService.instant('success delete key word'));
          this.msg.successparam_console(this.translateService.instant('success delete key word'));*/
        this.initListType();

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
        this.initListType();
      });
  }

  onCreateConfirm(event) {
    this.Type = new TypeDto();
    this.Type.lib_ar = event.newData.lib_ar;
    this.Type.lib_fr = event.newData.lib_fr;
    if (event.newData.isorganisme == "") {
      this.Type.isorganisme = null;
    }
    else {
      this.Type.isorganisme = event.newData.isorganisme;
    }


    if ((this.Type.lib_ar == "") || (this.Type.lib_fr == "")) {
      Swal.fire(
        'tous les champs sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }

    if ((this.Type.isorganisme == null) || (this.Type.lib_ar == null) || (this.Type.lib_fr == null)) {
      Swal.fire(
        'tous les champs sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }


    this._typeAddSubscription = this.typeservice.addTypes(this.Type).subscribe(
      res => {
        console.log('ajout de type de structure', res);
        // this.msg.success_add_notify(this.translateService.instant('success add mot cle'));
        // this.msg.successparam_console(this.translateService.instant('success add mot cle'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListType();
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

    this.Type = new TypeDto();
    this.Type.id = event.newData.id;
    this.Type.lib_fr = event.newData.lib_fr;
    this.Type.lib_ar = event.newData.lib_ar;
    this.Type.isorganisme = event.newData.isorganisme;

    if (this.Type.isorganisme == null || this.Type.lib_fr == "" || this.Type.lib_fr == null || this.Type.lib_ar == "" || this.Type.lib_ar == null) {

      Swal.fire(
        'tous les champs sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;

    }

    this._typeUpdSubscription = this.typeservice.updateTypes(this.Type).subscribe(
      res => {
        console.log("update type de structure")
        // this.msg.success_update_notify(this.translateService.instant('success update key word'));
        // this.msg.successparam_console(this.translateService.instant('success update key word'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListType();
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
    let typereq: IdRequest;
    typereq = new IdRequest(event.data.id, null, null);
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
        this.deleteType(typereq.id)
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

    if (this._typeLstSubscription != null) {
      this._typeLstSubscription.unsubscribe();
    }

    if (this._typeAddSubscription != null) {
      this._typeAddSubscription.unsubscribe();
    }

    if (this._typeUpdSubscription != null) {
      this._typeUpdSubscription.unsubscribe();
    }

    if (this._typeDelSubscription != null) {
      this._typeDelSubscription.unsubscribe();
    }

    if (this._onChangedSubscription != null) {
      this._onChangedSubscription.unsubscribe();
    }
    this.list = [];
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

        isorganisme: {
          title: 'Organisme ?',
          // type: 'html',
          width: '20%',
          required: true,

          class: 'required',
          filter: {
            type: 'custom',
            component: SmartSecondCustomFilterComponent
          },
          type: 'custom',
          renderComponent: SmartCustomRenderSimpleComponent, /* data view component for organisme type */

          editor: {
            type: 'custom',
            component: SmartSelectSimpleComponent, /* simple dropdown component */
          }

        }
        ,

        lib_fr: {
          title: 'Type',
          width: '40%',
          filter: true,
          type: 'html',

        },
        lib_ar: {
          title: 'النوع',
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


  initListType() {

    this._typeLstSubscription = this.typeservice.getTypes().subscribe(
      res => {
        console.log("liste", res);
        this.listType = res;
        // call shared service for update simple select data when smarttable changed his status
        this.notFoundMessage = 'pas de resultat, la liste est vide',
          console.log('**** type structure ', this.listType);

        this.source = new LocalDataSource(this.listType);
        this._onChangedSubscription = this.source.onChanged().subscribe((change) => {
          // call shared service for update simple select data when smarttable changed his status
          if (change.action === 'filter') {
            this.smartaction.tooltipeAction(); // call generate tooltipe on filter renderer  
          }
        });
        this.smartaction.tooltipeAction();
        if (this.listType.length > 1) {
          this.showfilter = true;
          this.showactions = true;
          this.titleaction = 'Actions';
          // this.sharedService.sendcustomfilter(true);
          this.initSettingsTable();
          /** use mysettings in smart table (filter=true)*/
          this.settings = Object.assign({}, this.mysettings);
        }

        if (this.listType.length <= 1) {
          /** use emptysettings in smart table (filter=false)*/

          this.showfilter = false;
          this.showactions = true;
          this.titleaction = 'Actions';
          // this.sharedService.sendcustomfilter(false);
          this.initSettingsTable();
          this.settings = Object.assign({}, this.mysettings);
        }
        this.list.push({ 'value': false, 'title': 'NON,-لا' });
        this.list.push({ 'value': true, 'title': 'OUI,-نعم' });
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

  newList() {

    this.sharedService.simpledatalist(this.list);
    this.sharedService.textlist(this.defaulttextlist);
  }

}
