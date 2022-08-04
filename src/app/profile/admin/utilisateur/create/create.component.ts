import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { FonctionnairesService } from 'src/app/shared/services/fonctionnaire/fonctionnaires.service';
import { UtilisateursService } from 'src/app/shared/services/utilisateur/utilisateurs.service';
import { NotificationService } from 'src/app/shared/services/plugins/notification.service';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';
import { UserstructVO } from 'src/app/shared/models/utilisateur/userstruct-vo.model';
import { Role } from 'src/app/shared/models/enumeration/role.enum';
import { StatusEnum } from 'src/app/shared/models/enumeration/StatusEnum';
import { GroupeService } from 'src/app/shared/services/utilisateur/groupe.service';
import { UserDto } from 'src/app/shared/models/utilisateur/user-dto.model';
import { DualListComponent } from 'angular-dual-listbox';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  searchFonctionnaire: FormGroup;
  creatacount: FormGroup;
  error = '';
  submitted = false;
  submitteduser = false;
  heading: any = "Gestion des utilisateur";
  subheading: any = "Ajouter d'un nouveau utilisateur";
  matricule: string;
  FonctionnaireWithStructure: UserstructVO;
  notFoundMessage: string = "";
  identifiantaccount: string = "";
  roles: any;
  status: any;
  defaultrole: string = "SIMPLE_USER";
  source: Array<any>;
  confirmed: [];
  key: string;
  display: string;
  User: UserDto;
  filter: boolean = true;
  keystatus(): Array<string> {
    var keystatus = Object.keys(this.status);
    return keystatus.slice(keystatus.length / 2);
  }

  keysstatus(): Array<string> {
    var keysstatus = Object.keys(this.status);
    return keysstatus.slice(keysstatus.length / 2);
  }

  keys(): Array<string> {
    var keys = Object.keys(this.roles);
    return keys.slice(keys.length / 2);
  }
  format: any = { add: 'Liste des groupes', remove: 'Affectation', all: 'Tous', none: 'Aucun', direction: DualListComponent.LTR, draggable: true, placeholder: 'Recherche' };

  private _FonctionnaireSubscription: Subscription;
  private _GroupeSubscription: Subscription;
  private _UserSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private FonctionnairesService: FonctionnairesService,
    private groupeservice: GroupeService,
    private utilisateursservice: UtilisateursService,
    private notifyService: NotificationService
  ) {
  }

  ngOnInit(): void {

    this.getstatus()
    this.initlistGroupes();

    this.searchFonctionnaire = this.formBuilder.group({

      identifiant: [null, Validators.required],

    });

    this.creatacount = this.formBuilder.group({

      login: [null, Validators.required],
      password: [null, Validators.required],
      role: [null, Validators.required],
      status: [null, Validators.required]
    })

  }
  get f() { return this.searchFonctionnaire.controls; }
  get g() { return this.creatacount.controls; }

  initlistGroupes() {

    this._GroupeSubscription = this.groupeservice.getGroupes()
      .subscribe(
        data => {
          this.key = 'id';
          this.display = 'name';
          this.source = JSON.parse(JSON.stringify(data));
          this.confirmed = [];
          console.log("groupes", data);
          if (data == null) {
            this.notifyService.showError("pas de resultas", "liste des Groupes");
          }

        },
        error => {
          this.error = error;
          this.notifyService.showError("Erreur dans la l'affichage de la liste  ??", "Groupes d'application");
        });

  }

  onItemChange(e) {

  }

  getstatus() {
    this.status = StatusEnum;
    console.log('status', this.status);
  }

  confirmechange(e) {
   // alert("test");
    this.confirmed = e;
    console.log("change", e);
  }

  filterBtn() {
    return (this.filter ? 'Hide Filter' : 'Show Filter');
  }


  onSubmitSearch() {

    this.submitted = true;
    if (this.searchFonctionnaire.invalid) {
      return;
    }

    let req = new IdRequest(this.f.identifiant.value, null, null);

    this._FonctionnaireSubscription = this.FonctionnairesService.getUsersWithOrganismeByIdentifiant(req)
      .subscribe(
        data => {
          this.FonctionnaireWithStructure = data;
          this.identifiantaccount = this.f.identifiant.value;
          this.submitted = true;
          this.roles = Role;
          this.g.login.setValue(this.f.identifiant.value);
          console.log("user struct vo", data);
          if (data == null) {
            this.notFoundMessage = "pas de resultas trouvés";
          }
          else {
            this.notFoundMessage = "";
          }
        },
        error => {
          this.error = error;
          this.notifyService.showError("Erreur dans la recherche ??", "Recherche Fonctionnaire");
        });

  }

  onSubmitAcount() {
    
    this.submitteduser = true;
    if (this.creatacount.invalid) {
      return;
    }

    this.User = new UserDto();

    this.User.organismeId = this.FonctionnaireWithStructure.fonctionnaire.organismeId;
    this.User.identifiant = this.FonctionnaireWithStructure.fonctionnaire.identifiant;
    this.User.password = this.g.password.value;
    this.User.email = this.FonctionnaireWithStructure.fonctionnaire.contact.email_prof;
    this.User.role = this.g.role.value;
    this.User.groupes = this.confirmed;
    this.User.status = this.g.status.value;
    this.User.createdBy = null;

    console.log("USERDTO", this.User);
    this._UserSubscription = this.utilisateursservice.addUsers(this.User)
      .subscribe(
        data => {

          console.log("Insert user data", data);
          this.notifyService.showSuccess("succées d'Ajout ", "Ajout Utilisateur");
          if (data == null) {
            this.notFoundMessage = "pas de resultas trouvés";
          }
          else {
            this.notFoundMessage = "";
          }
        },
        error => {
          this.error = error;
          this.notifyService.showError("Erreur dans l'ajout' ??", "Ajout Fonctionnaire");
        });

  }
}
