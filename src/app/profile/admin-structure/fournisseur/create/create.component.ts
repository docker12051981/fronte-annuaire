import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ResponsableDto } from 'src/app/shared/models/contrat/responsable-dto.model';
import { FournisseurDto } from 'src/app/shared/models/contrat/fournisseur-dto.model';
import { FournisseurService } from 'src/app/shared/services/contrat/fournisseur.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/plugins/notification.service';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';
import { DecodageTokenService } from 'src/app/shared/services/auth/decodage-token.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  value?: string;
  Idreq: IdRequest;
  disabled = true;
  loading = false;
  addFournisseur: FormGroup;
  error = '';
  submitted = false;
  responsable: ResponsableDto;
  fournisseur: FournisseurDto;
  heading: any = "Gestion des fournisseurs";
  subheading: any = "Creation d'une nouveau fournisseur";


  private _FournisseurSubscription: Subscription;
  constructor(
    private decodetokenservice: DecodageTokenService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private router: Router,
    private FournisseurService: FournisseurService,

  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.value = '1001';
    }, 1000);

    this.addFournisseur = this.formBuilder.group({

      raison_social: [null, Validators.required],
      matricule_fiscale: [null, Validators.required],
      adresse: [null, Validators.required],
      num_tel: [null, [Validators.required, Validators.pattern("[0-9]{2} [0-9]{3} [0-9]{3}")]],
      num_fax: [null, [Validators.required, Validators.pattern("[0-9]{2} [0-9]{3} [0-9]{3}")]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      nom_resp: [null, Validators.required],
      prenom_resp: [null, Validators.required],
      num_tel_resp: [null, [Validators.required, Validators.pattern("[0-9]{2} [0-9]{3} [0-9]{3}")]],
      email_resp: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],

    });

  }

  get f() { return this.addFournisseur.controls; }

  clearForm() {
    this.addFournisseur.reset();
  }


  onSubmit() {

    this.submitted = true;
    if (this.addFournisseur.invalid) {
      return;
    }
    this.fournisseur = new FournisseurDto();
    this.fournisseur.organisme = this.decodetokenservice.getOrganismeUserToken(); console.log(this.decodetokenservice.getOrganismeUserToken());
    this.fournisseur.raison_social = this.f.raison_social.value; console.log(this.f.raison_social.value);
    this.fournisseur.matricule_fiscale = this.f.matricule_fiscale.value; console.log(this.f.matricule_fiscale.value);
    this.fournisseur.email = this.f.email.value; console.log(this.f.email.value);
    this.fournisseur.num_tel = this.f.num_tel.value; console.log(this.f.num_tel.value);
    this.fournisseur.num_fax = this.f.num_fax.value; console.log(this.f.num_fax.value);
    this.fournisseur.adresse = this.f.adresse.value; console.log(this.f.adresse.value);
    this.fournisseur.responsable =
    {
      nom_resp: this.f.nom_resp.value,
      prenom_resp: this.f.prenom_resp.value,
      email_resp: this.f.email_resp.value,
      num_tel_resp: this.f.num_tel_resp.value
    };

    console.log("submit", this.fournisseur)

    this._FournisseurSubscription = this.FournisseurService.addFournisseurs(this.fournisseur)
      .subscribe(
        data => {
          this.notifyService.showSuccess("effectué avec succes !!", "Ajout de Fournisseur")
          this.submitted = true;
          this.clearForm();
          this.router.navigate(['profile/admin-structure/fournisseur']);

        },
        error => {
          this.error = error;
          this.notifyService.showError("Erreur veillez vérifier les données insérés ??", "Ajout de Fournisseur");
          this.loading = false;

        });

  }


  ngOnDestroy() {

    if (this._FournisseurSubscription != null) {
      this._FournisseurSubscription.unsubscribe();
    }

  }
}
