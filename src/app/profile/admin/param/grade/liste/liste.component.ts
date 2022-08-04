import { Component, OnInit } from '@angular/core';
import { GradeService } from 'src/app/shared/services/fonctionnaire/grade.service';
import { GradeDto } from 'src/app/shared/models/fonctionnaire/grade-dto.model';
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
  public listGrade: GradeDto[];
  Grade: GradeDto;
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
  private _gradeLstSubscription: Subscription;
  private _gradeAddSubscription: Subscription;
  private _gradeUpdSubscription: Subscription;
  private _gradeDelSubscription: Subscription;
  private _onChangedSubscription: Subscription;
  constructor(private smartaction: SmartactionService, private gradeservice: GradeService) {

    this.source = new LocalDataSource(this.listGrade);
    this.showfilter = false;
    this.showactions = false;
    this.notFoundMessage = 'Erreur affichage de la list';
    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);

  }


  ngOnInit() {

    /** init Classes */
    this.initListGrade();
    this.showactions = false;
    this.showfilter = false;
    this.titleaction = 'Actions';
    this.noDataFound = 'pas de contenu affiché';

    this.initSettingsTable();
    this.settings = Object.assign({}, this.mysettings);
    this.source = new LocalDataSource(this.listGrade);
  }

  deleteClasse(req: any) {

    this._gradeDelSubscription = this.gradeservice.deleteGrades(req).subscribe(
      res => {
        console.log("suppression de grade" + res)
        /*  this.msg.success_delete_notify(this.translateService.instant('success delete key word'));
          this.msg.successparam_console(this.translateService.instant('success delete key word'));*/
        this.initListGrade();

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
        this.initListGrade();
      });
  }

  onCreateConfirm(event) {
    this.Grade = new GradeDto();
    this.Grade.code = event.newData.code;
    this.Grade.lib_ar = event.newData.lib_ar;
    this.Grade.lib_fr = event.newData.lib_fr;

    if ((this.Grade.lib_ar == "") || (this.Grade.lib_fr == "")) {
      Swal.fire(
        'les deux grades en francais et en arabe sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }

    if ((this.Grade.lib_ar == null) || (this.Grade.lib_fr == null)) {
      Swal.fire(
        'les deux grades en francais et en arabe sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;
    }


    this._gradeAddSubscription = this.gradeservice.addGrades(this.Grade).subscribe(
      res => {
        console.log('ajout de grade', res);
        // this.msg.success_add_notify(this.translateService.instant('success add mot cle'));
        // this.msg.successparam_console(this.translateService.instant('success add mot cle'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListGrade();
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

    this.Grade = new GradeDto();
    this.Grade.id = event.newData.id;
    this.Grade.code = event.newData.code;
    this.Grade.lib_fr = event.newData.lib_fr;
    this.Grade.lib_ar = event.newData.lib_ar;

    if (this.Grade.lib_fr == "" || this.Grade.lib_fr == null || this.Grade.lib_ar == "" || this.Grade.lib_ar == null) {

      Swal.fire(
        'les deux grades en francais et en arabe sont obligatoire',
        'OK',
        'error',
      );
      event.confirm.reject();
      return;

    }

    this._gradeUpdSubscription = this.gradeservice.updateGrades(this.Grade).subscribe(
      res => {
        console.log("update grade")
        // this.msg.success_update_notify(this.translateService.instant('success update key word'));
        // this.msg.successparam_console(this.translateService.instant('success update key word'));
        event.confirm.resolve();
        this.smartaction.tooltipeAction();
        this.initListGrade();
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
    let gradereq: IdRequest;
    gradereq = new IdRequest(event.data.id, null, null);
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
        this.deleteClasse(gradereq.id)
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

    if (this._gradeLstSubscription != null) {
      this._gradeLstSubscription.unsubscribe();
    }

    if (this._gradeAddSubscription != null) {
      this._gradeAddSubscription.unsubscribe();
    }

    if (this._gradeUpdSubscription != null) {
      this._gradeUpdSubscription.unsubscribe();
    }

    if (this._gradeDelSubscription != null) {
      this._gradeDelSubscription.unsubscribe();
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
          title: 'Grade',
          width: '30%',
          filter: true,
          type: 'html',

        },
        lib_ar: {
          title: 'الرتبة',
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


  initListGrade() {

    this._gradeLstSubscription = this.gradeservice.getGrades().subscribe(
      res => {
        console.log("liste grade", res);
        this.listGrade = res;
        this.notFoundMessage = 'pas de resultat, la liste est vide',
          console.log('**** liste Grade ', this.listGrade);

        this.source = new LocalDataSource(this.listGrade);
        this._onChangedSubscription = this.source.onChanged().subscribe((change) => {

          if (change.action === 'filter') {
            this.smartaction.tooltipeAction(); // call generate tooltipe on filter renderer  
          }
        });
        this.smartaction.tooltipeAction();
        if (this.listGrade.length > 1) {
          this.showfilter = true;
          this.showactions = true;
          this.titleaction = 'Actions';
          // this.sharedService.sendcustomfilter(true);
          this.initSettingsTable();
          /** use mysettings in smart table (filter=true)*/
          this.settings = Object.assign({}, this.mysettings);
        }

        if (this.listGrade.length <= 1) {
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
