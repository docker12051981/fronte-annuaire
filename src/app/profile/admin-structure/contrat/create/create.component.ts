import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { StructureDto } from 'src/app/shared/models/structure/structure-dto.model';
import { TypeDto } from 'src/app/shared/models/contrat/type-dto.model';
import { NatureDto } from 'src/app/shared/models/contrat/nature-dto.model';
import { StatusEnum } from 'src/app/shared/models/enumeration/constante';
import { Contratstatus } from 'src/app/shared/models/enumeration/contratstatus.enum';
import { StructuresService } from 'src/app/shared/services/structure/structures.service';
import { FournisseurService } from 'src/app/shared/services/contrat/fournisseur.service';
import { ContratService } from 'src/app/shared/services/contrat/contrat.service';
import { TypeService } from 'src/app/shared/services/contrat/type.service';
import { NatureService } from 'src/app/shared/services/contrat/nature.service';
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
  addContrat: FormGroup;
  error = '';
  submitted = false;
  structure: StructureDto;
  listStructure: StructureDto[];
  Subtree: StructureVO;
  Fulltree: StructureVO;
  lsttype: TypeDto[];
  lstnature: NatureDto[];
  selectedtype: any;
  selectparendorgid: number = null;
  selectedparent: any = null;
  selectedparentarray: Array<any> = [];
  selectedsoustype: any = { id: "", typeId: "", lib_fr: "", lib_ar: "" };
  /*selectedtype: any;*/
  selectednature: any;
  selectedfournisseur: any;

  status: any;
  gouv: any;
  tree: any = 1;

  heading: any = "Gestion des contrats";
  subheading: any = "Creation d'un nouveau contrat";
  keys(): Array<string> {
    var keys = Object.keys(this.status);
    return keys.slice(keys.length / 2);
  }
  private _structureLstSubscription: Subscription;
  private _typeLstSubscription: Subscription;
  private _natureLstSubscription: Subscription;
  private _typecontratLstSubscription: Subscription;
  private _fournisseurLstSubscription: Subscription;
  private _subtreeSubscription: Subscription;
  private _FulltreeSubscription: Subscription;
  private _StructureByKeySubscription: Subscription;
  constructor(
    private contratservice: ContratService,
    private fournisseurservice: FournisseurService,
    private typecontratservice: TypeService,
    private natureservice: NatureService,
    private structureservice: StructuresService,
    private formBuilder: FormBuilder,

    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private router: Router,

  ) {

  }

  ngOnInit(): void {

    /* setTimeout(() => {
       this.value = '1001';
     }, 1000);
 
     this.addContrat = this.formBuilder.group({
       parent: [null],
       reference: [null, Validators.required],
       objet: [null, Validators.required],
       status: [null, Validators.required],
       Etat: [null, Validators.required],
       type: [null, Validators.required],
       nature: [null, Validators.required],
       fournisseur: [null, Validators.required],
       structure: [null, Validators.required],
       date_debut: [null, Validators.required],
       duree_annuel: [null, Validators.required],
       echeance: [null, Validators.required],
     });
 
     this.initlisttype();
     this.initlistsecteureactivite();
     this.getstatus();
     this.initliststructure();
     this.initfulltree();
 
   }
 
   get f() { return this.addStructure.controls; }
 
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
 
   /*initsubtree() {
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
   }*/

    /*
    initlisttype() {
      this._typeLstSubscription = this.typeservice.getTypes().subscribe(
        res => {
          console.log("liste types", res);
          this.lsttype = res;
        },
        error => {
          console.log(error);
          this.notifyService.showError("Erreur ??", "Chargement de la liste des types")
        }
      );
    }
  
    initlistsecteureactivite() {
      this._secteureactiviteLstSubscription = this.secteureactiviteservice.getSecteureActivite().subscribe(
        res => {
          console.log("liste secteure d'activite ", res);
          this.lstsecteureacetvite = res;
        },
        error => {
          console.log(error);
          this.notifyService.showError("Erreur ??", "Chargement de la liste des secteurs d'activit??");
        }
      );
    }
  
    getsoustypebytype(id) {
      this._soustypeLstSubscription = this.soustypeservice.getsousTypesBytype(id).subscribe(
        res => {
          console.log("liste sous types", res);
          this.lstsoustype = res;
        },
        error => {
          console.log(error);
  
          this.notifyService.showError("Erreur ??", "Chargement de la liste des sous types")
        }
      );
    }
  
    getstatus() {
      this.status = StatusEnum;
      console.log('status', this.status);
    }
  
    onItemChange(event) {
      console.log("form", this.addStructure.value);
    }
  
    onChange($event: string): void {
      console.log("treeselect", $event);
      this.selectedparent = $event;
      if ($event != undefined && $event != '1001') {
        let keyval = parseInt(this.selectedparent);
        let req = new IdRequest(null, keyval, null);
        this.getnode(req);
      }
    }
  
    getnode(reqId: IdRequest) {
      this._StructureByKeySubscription = this.structureservice.getStructureByKey(reqId).subscribe(
        res => {
          console.log("get structure by key", res);
          this.structure = res;
          if (Object.keys(this.structure).length != 0) {
            this.selectparendorgid = this.structure.orgId;
          }
        },
        error => {
          console.log(error);
          this.notifyService.showError("detail de la structure", "Erreur !!");
        }
      )
    }
  
    selectParent(event: any) {
      console.log("parent", event);
      this.f.parent.setValue(event.id);
      this.selectedparent = parseInt(event.id);
      //this.selectparendorgid = event.orgId;
      this.tree = 1;
      // this.selectedparentarray.push(this.selectParent);
  
    }
  
    selectType(event) {
      console.log("type", event);
      if (event) {
        this.getsoustypebytype(event.id);
        this.f.type.setValue(event.id);
        this.selectedtype = event;
      }
    }
  
    selectsousType(event) {
      console.log("sous-type-selected", event);
      if (event) {
        //this.getsoustypebytype(event.id);
        this.f.soustype.setValue(event.id);
        this.selectedsoustype = event;
      }
    }
  
    selectsecteureactivite(event) {
      console.log("secteure activite", event);
      this.f.secteure.setValue(event.id);
      this.selectedsecteure = event;
    }
  
    selectGouvernorat(event) {
      console.log("gouvernorat", event);
      this.f.gouvernorat.setValue(event);
      this.selectedgouvernorat = event;
    }
  
    selectVille(event) {
      console.log("ville", event);
      this.f.ville.setValue(event);
      this.selectedville = event;
    }
  
  
    selectDelegation(event) {
      console.log("delegation", event);
      this.f.delegation.setValue(event);
      this.selecteddelegation = event;
    }
  
  
    onParentClear() {
  
    }
  
    onTypeClear() {
  
    }
  
  
    onsousTypeClear() {
  
    }
  
    onGouvernoratClear() {
  
    }
  
    onVilleClear() {
  
    }
  
    onsecteureAcitiviteClear() {
  
    }
  
    onDelegationClear() {
  
    }
  
    clearForm() {
      this.addStructure.reset();
    }
  
    onSubmit() {
  
      this.submitted = true;
      if (this.addStructure.invalid) {
        return;
      }
      this.structure = new StructureDto();
      console.log(this.f.parent.value);
  
      console.log("tableau", this.selectedparentarray);
      this.selectedparentarray.push(this.selectedparent);
      this.structure.parentId = this.selectedparentarray;
      console.log(this.tree);
      this.structure.treeId = this.tree;
      if (this.selectedtype.isorganisme === false) {
  
        this.structure.orgId = this.selectparendorgid;
      }
      else if (this.selectedtype.isorganisme === true) {
  
        this.structure.orgId = 0;
      }
      console.log("orgId", this.structure.orgId);
      this.structure.abr_fr = this.f.abr_fr.value;
      console.log(this.f.abr_fr.value);
      this.structure.abr_ar = this.f.abr_ar.value; console.log(this.f.abr_ar.value);
      this.structure.title = this.f.lib_fr.value; console.log(this.f.lib_fr.value);
      this.structure.name = this.f.lib_fr.value; console.log(this.f.lib_fr.value);
      this.structure.lib_ar = this.f.lib_ar.value; console.log(this.f.lib_ar.value);
      this.structure.logo = null;
      this.structure.description_fr = this.f.description_fr.value; console.log(this.f.description_fr.value);
      this.structure.description_ar = this.f.description_ar.value; console.log(this.f.description_ar.value);
      this.structure.Secteureactivite =
      {
        id: this.selectedsecteure.id,
        code: null,
        lib_fr: null,
        lib_ar: null
      };
      console.log(this.f.secteure.value);
      this.structure.type = {
        id: this.selectedtype.id,
        isorganisme: null,
        lib_fr: null,
        lib_ar: null
      };
      console.log(this.f.type.value);
      this.structure.soustype =
      {
        id: this.selectedsoustype.id,
        typeId: this.selectedsoustype.typeId,
        lib_fr: this.selectedsoustype.lib_fr,
        lib_ar: this.selectedsoustype.lib_ar
      }
      console.log(this.f.soustype.value);
      this.structure.status = this.f.status.value; console.log(this.f.status.value);
      this.structure.adresse = {
        gouvernorat: this.f.gouvernorat.value,
        ville: this.f.ville.value,
        delegation: this.f.ville.value,
        rue_fr: this.f.rue_fr.value,
        rue_ar: this.f.rue_ar.value,
        num: this.f.num.value,
        postal: this.f.postal.value
      };
      console.log("adresse", this.structure.adresse);
      this.structure.contact = {
        num_tel: this.f.tel1.value,
        num_tel2: this.f.tel2.value,
        num_fax: this.f.fax1.value,
        num_fax2: this.f.fax2.value,
        email: this.f.email.value,
        site_web: this.f.site_web.value,
        social_fb: this.f.social_fb.value,
        social_twitter: this.f.social_twitter.value,
        social_linkdin: this.f.social_twitter.value
      };
  
      console.log("contact", this.structure.contact);
      console.log("submit", this.structure)
  
      this.structureservice.addStructures(this.structure)
        .subscribe(
          data => {
            this.notifyService.showSuccess("effectu?? avec succes !!", "Ajout de Structure")
            this.submitted = true;
            this.clearForm();
            this.router.navigate(['profile/admin/structure']);
  
          },
          error => {
            this.error = error;
            this.notifyService.showError("Erreur v??rifier les donn??es ins??r??s ??", "Ajout de Structure");
            this.loading = false;
  
          });
  */
  }


  ngOnDestroy() {
    /*
        if (this._structureLstSubscription != null) {
          this._structureLstSubscription.unsubscribe();
        }
    
    
        if (this._typeLstSubscription != null) {
          this._typeLstSubscription.unsubscribe();
        }
    
        if (this._typeLstSubscription != null) {
          this._typeLstSubscription.unsubscribe();
        }
    
        if (this._soustypeLstSubscription != null) {
          this._soustypeLstSubscription.unsubscribe();
        }
        if (this._secteureactiviteLstSubscription != null) {
          this._secteureactiviteLstSubscription.unsubscribe();
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
        */

  }
}
