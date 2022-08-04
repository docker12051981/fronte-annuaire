import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { StructureDto } from 'src/app/shared/models/structure/structure-dto.model';
import { ClasseDto } from 'src/app/shared/models/fonctionnaire/classe.model';
import { GradeDto } from 'src/app/shared/models/fonctionnaire/grade-dto.model';
import { FonctionDto } from 'src/app/shared/models/fonctionnaire/fonction-dto.model';
import { FonctionnaireDto } from 'src/app/shared/models/fonctionnaire/fonctionnaire-dto.model';
import { DiplomeDto } from 'src/app/shared/models/fonctionnaire/diplome.model';
import { Genre } from 'src/app/shared/models/enumeration/genre.enum';
import { PositionEnum } from 'src/app/shared/models/enumeration/constante';
import { StructuresService } from 'src/app/shared/services/structure/structures.service';
import { ClasseService } from 'src/app/shared/services/fonctionnaire/classe.service';
import { GradeService } from 'src/app/shared/services/fonctionnaire/grade.service';
import { FonctionService } from 'src/app/shared/services/fonctionnaire/fonction.service';
import { FonctionnairesService } from 'src/app/shared/services/fonctionnaire/fonctionnaires.service';
import { DiplomeService } from 'src/app/shared/services/fonctionnaire/diplome.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/plugins/notification.service';
import { StructureVO } from 'src/app/shared/models/structure/structure-vo.model';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  expandKeys = ['100', '1001'];
  value?: string;
  nodes = [];
  Idreq: IdRequest;
  disabled = true;
  loading = false;
  addFonctionnaire: FormGroup;
  error = '';
  submitted = false;
  structure: StructureDto;
  fonctionnaire: FonctionnaireDto;
  listStructure: StructureDto[];
  Subtree: StructureVO;
  Fulltree: StructureVO;
  lstclasse: ClasseDto[];
  lstgrade: GradeDto[];
  lstfonction: FonctionDto[];
  lstdiplome: DiplomeDto[];
  selectedclasse: any;
  selectedgrade: any
  selectedfonction: any;
  selecteddiplome: any;
  selectedposition: any;
  selectedstruct: any;
  selectedorganisme: any;
  selectedstructbykey: any;
  sexe: any;
  position: any;
  model: any;
  model_recrutement: any;
  heading: any = "Gestion des fonctionnaires";
  subheading: any = "Creation d'une nouveau fonctionnaire";
  keys(): Array<string> {
    var keys = Object.keys(this.sexe);
    return keys.slice(keys.length / 2);
  }
  private _structureLstSubscription: Subscription;
  private _classeLstSubscription: Subscription;
  private _gradeLstSubscription: Subscription;
  private _fonctionLstSubscription: Subscription;
  private _diplomeLstSubscription: Subscription;
  private _subtreeSubscription: Subscription;
  private _FulltreeSubscription: Subscription;
  private _StructureByKeySubscription: Subscription;
  private _FonctionnaireSubscription: Subscription;
  constructor(private structureservice: StructuresService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private router: Router,
    private classeservice: ClasseService,
    private Gradeservice: GradeService,
    private Fonctionservice: FonctionService,
    private FonctionnairesService: FonctionnairesService,
    private Diplomeservice: DiplomeService
  ) 
  {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.value = '1001';
    }, 1000);

    this.addFonctionnaire = this.formBuilder.group({
      affectation: [null],
      nom_fr: [null, Validators.required],
      nom_ar: [null, Validators.required],
      prenom_fr: [null, Validators.required],
      prenom_ar: [null],
      identifiant: [null],
      cin: [null],
      classe: [null, Validators.required],
      grade: [null, Validators.required],
      fonction: [null, Validators.required],
      diplome: [null, Validators.required],
      date_naissance: [null, Validators.required],
      date_recrutement: [null, Validators.required],
      genre: [null, Validators.required],
      position: [null, Validators.required],
      num_tel_prof: [null, [Validators.required, Validators.pattern("[0-9]{2} [0-9]{3} [0-9]{3}")]],
      num_tel_perso: [null, Validators.pattern("[0-9]{2} [0-9]{3} [0-9]{3}")],
      num_fax: [null, [Validators.required, Validators.pattern("[0-9]{2} [0-9]{3} [0-9]{3}")]],
      poste: [null, Validators.required],
      email_prof: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      email_perso: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      skype: [null, Validators.required],
      social_fb: [null, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      social_twitter: [null, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      social_linkdin: [null, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]
    });

    this.initlistclasse();
    this.initlistgrade();
    this.initlistfonction();
    this.initlistdiplome();
    this.getgenre();
    this.getposition();
    this.initliststructure();
    this.initfulltree();

  }

  get f() { return this.addFonctionnaire.controls; }

  initliststructure() {
    this._structureLstSubscription = this.structureservice.getStructures().subscribe(
      res => {
        console.log("liste structure", res);
        this.listStructure = res;
      },
      error => {
        console.log(error);
        this.notifyService.showError("Erreur ??", "Chargement de la liste des structures");
      }
    );
  }

  initfulltree() {
    this._FulltreeSubscription = this.structureservice.getSubtree().subscribe(
      res => {
        console.log("tree", res);
        this.Fulltree = res;
        this.nodes.push(this.Fulltree);
      },
      error => {
        console.log(error);
        this.notifyService.showError("Chargement de la liste des structure", "Erreur !!");
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

  initlistclasse() {
    this._classeLstSubscription = this.classeservice.getClasses().subscribe(
      res => {
        console.log("liste classes", res);
        this.lstclasse = res;
      },
      error => {
        console.log(error);
        this.notifyService.showError("Erreur ??", "Chargement de la liste des types")
      }
    );
  }

  initlistfonction() {
    this._fonctionLstSubscription = this.Fonctionservice.getFonctions().subscribe(
      res => {
        console.log("liste fonction ", res);
        this.lstfonction = res;
      },
      error => {
        console.log(error);
        this.notifyService.showError("Erreur ??", "Chargement de la liste des fonctions");
      }
    );
  }

  initlistgrade() {
    this._gradeLstSubscription = this.Gradeservice.getGrades().subscribe(
      res => {
        console.log("liste grades ", res);
        this.lstgrade = res;
      },
      error => {
        console.log(error);
        this.notifyService.showError("Erreur ??", "Chargement de la liste des grade");
      }
    );
  }


  initlistdiplome() {
    this._diplomeLstSubscription = this.Diplomeservice.getDiplomes().subscribe(
      res => {
        console.log("liste diplomes ", res);
        this.lstdiplome = res;
      },
      error => {
        console.log(error);
        this.notifyService.showError("Erreur ??", "Chargement de la liste des diplomes");
      }
    );
  }

  getgenre() {
    this.sexe = Genre;
    console.log('genre', this.sexe);
  }

  getposition() {
    this.position = PositionEnum;
    console.log('position', this.position);
  }

  onItemChange(event) {
    console.log("form", this.addFonctionnaire.value);
  }


  getnode(reqId: IdRequest) {

    this._StructureByKeySubscription = this.structureservice.getStructureByKey(reqId).subscribe(
      res => {
        console.log("get structure by key", res);
        this.structure = res;
        if (Object.keys(this.structure).length != 0) {
          this.selectedstruct = this.structure.id;
          this.selectedorganisme = this.structure.orgId;
          console.log("structureid", this.selectedstruct);
          console.log("organismeid", this.selectedorganisme);
        }
      },
      error => {
        console.log(error);
        this.notifyService.showError("detail de la structure", "Erreur !!");
      }
    )

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

  selectClasse(event: any) {
    console.log("classe", event);
    if (event) {
      this.f.classe.setValue(event.id);
      this.selectedclasse = event;
    }
  }

  selectGrade(event) {
    console.log("grade", event);
    if (event) {
      this.f.grade.setValue(event.id);
      this.selectedgrade = event;
    }
  }

  selectFonction(event) {
    console.log("fonction", event);
    if (event) {
      this.f.fonction.setValue(event.id);
      this.selectedfonction = event;
    }
  }

  selectDiplome(event) {
    console.log("diplome", event);
    if (event) {
      this.f.diplome.setValue(event.id);
      this.selecteddiplome = event;
    }
  }


  selectPosition(event) {
    console.log("position", event);
    if (event) {
      this.f.position.setValue(event.value);
      this.selectedposition = event.value;
    }
  }

  onPositionClear() {

  }

  onClasseClear() {

  }

  onGradeClear() {

  }


  onFonctionClear() {

  }

  onGouvernoratClear() {

  }

  onDiplomeClear() {

  }


  clearForm() {
    this.addFonctionnaire.reset();
  }


  onSubmit() {

    this.submitted = true;
    if (this.addFonctionnaire.invalid) {
      return;
    }
    this.fonctionnaire = new FonctionnaireDto();
    console.log(this.f.affectation.value);


    this.fonctionnaire.organismeId = this.selectedorganisme;
    this.fonctionnaire.structureId = this.selectedstruct;
    this.fonctionnaire.identifiant = this.f.identifiant.value;
    console.log(this.f.identifiant.value);
    this.fonctionnaire.cin = this.f.cin.value; console.log(this.f.cin.value);
    this.fonctionnaire.nom_fr = this.f.nom_fr.value; console.log(this.f.nom_fr.value);
    this.fonctionnaire.nom_ar = this.f.nom_ar.value; console.log(this.f.nom_ar.value);
    this.fonctionnaire.prenom_fr = this.f.prenom_fr.value; console.log(this.f.prenom_fr.value);
    this.fonctionnaire.prenom_ar = this.f.prenom_ar.value; console.log(this.f.prenom_ar.value);
    this.fonctionnaire.date_naissance =
    {
      year: parseInt(this.f.date_naissance.value.year),
      month: parseInt(this.f.date_naissance.value.month),
      day: parseInt(this.f.date_naissance.value.day)
    };

    console.log(this.f.date_naissance.value);
    this.fonctionnaire.date_recrutement =
    {
      year: parseInt(this.f.date_recrutement.value.year),
      month: parseInt(this.f.date_recrutement.value.month),
      day: parseInt(this.f.date_recrutement.value.day)
    };
    console.log(this.f.date_recrutement.value);
    this.fonctionnaire.genre = this.f.genre.value; console.log(this.f.genre.value);
    this.fonctionnaire.position = this.f.position.value; console.log(this.f.position.value);
    this.fonctionnaire.fonction =
    {
      id: this.selectedfonction.id,
      code: null,
      lib_fr: null,
      lib_ar: null
    };
    console.log(this.f.fonction.value);
    this.fonctionnaire.grade = {
      id: this.selectedgrade.id,
      code: null,
      lib_fr: null,
      lib_ar: null
    };
    console.log(this.f.grade.value);
    this.fonctionnaire.classe = {
      id: this.selectedclasse.id,
      code: null,
      lib_fr: null,
      lib_ar: null
    };
    //console.log(this.f.class.value);
    this.fonctionnaire.diplome = {
      id: this.selecteddiplome.id,
      code: null,
      lib_fr: null,
      lib_ar: null
    };
    console.log(this.f.diplome.value);

    this.fonctionnaire.position = this.f.position.value; console.log(this.f.position.value);

    this.fonctionnaire.contact = {
      num_tel_prof: this.f.num_tel_prof.value,
      num_fax: this.f.num_fax.value,
      poste: this.f.poste.value,
      num_tel_perso: this.f.num_tel_perso.value,
      email_prof: this.f.email_prof.value,
      email_perso: this.f.email_perso.value,
      social_linkdin: this.f.social_linkdin.value,
      social_facebook: this.f.social_fb.value,
      social_twitter: this.f.social_twitter.value,
      skype: this.f.skype.value,
    };

    console.log("contact", this.fonctionnaire.contact);
    console.log("submit", this.fonctionnaire)

    this._FonctionnaireSubscription = this.FonctionnairesService.addFonctionnaires(this.fonctionnaire)
      .subscribe(
        data => {
          this.notifyService.showSuccess("effectué avec succes !!", "Ajout de Fonctionnaire")
          this.submitted = true;
          this.clearForm();
          this.router.navigate(['profile/admin/fonctionnaire']);

        },
        error => {
          this.error = error;
          this.notifyService.showError("Erreur veillez vérifier les données insérés ??", "Ajout de Fonctionnaire");
          this.loading = false;

        });

  }


  ngOnDestroy() {

    if (this._structureLstSubscription != null) {
      this._structureLstSubscription.unsubscribe();
    }

    if (this._classeLstSubscription != null) {
      this._gradeLstSubscription.unsubscribe();
    }

    if (this._fonctionLstSubscription != null) {
      this._diplomeLstSubscription.unsubscribe();
    }

    if (this._subtreeSubscription != null) {
      this._subtreeSubscription.unsubscribe();
    }
    if (this._FulltreeSubscription != null) {
      this._FulltreeSubscription.unsubscribe();
    }
    if (this._StructureByKeySubscription != null) {
      this._StructureByKeySubscription.unsubscribe();
    }
    if (this._FonctionnaireSubscription != null) {
      this._FonctionnaireSubscription.unsubscribe();
    }

  }
}
