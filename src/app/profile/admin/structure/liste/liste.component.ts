import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StructuresService } from 'src/app/shared/services/structure/structures.service';
import { StructureDto } from 'src/app/shared/models/structure/structure-dto.model';
import { TREE_ACTIONS, KEYS, IActionMapping, TreeModel, ITreeState, ITreeOptions } from '@circlon/angular-tree-component';
import { StructureVO } from 'src/app/shared/models/structure/structure-vo.model';
import { NotificationService } from 'src/app/shared/services/plugins/notification.service';
import { v4 } from 'uuid';
import { IdRequest } from 'src/app/shared/models/request/idrequest.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {
  public listStructure: StructureDto[];
  private _mouveSubscription: Subscription;
  heading: any = "Gestion des structures";
  subheading: any = "Affichage de la liste des structures";
  Subtree: StructureVO;
  Fulltree: StructureVO;
  detailstructure: StructureDto;
  private _subtreeSubscription: Subscription;
  private _FulltreeSubscription: Subscription;
  private _StructureByIdSubscription: Subscription;
  private _delStructureByIdSubscription: Subscription;
  arr: Array<any> = [];
  state: ITreeState = {};
  Idreq: IdRequest;
  showdetail: boolean = false;
  options: ITreeOptions = {};
  nodes: any = [];
  @ViewChild('tree') tree;

  active = 2;

  currentOrientation = 'horizontal';
  constructor(private structureservice: StructuresService,
    private router: Router,
    private notifyService: NotificationService) { }

  ngAfterViewInit() {
    this.tree.treeModel.expandAll();


  }

  ngOnInit(): void {
    this.initfulltree();
    //  this.initListStructure();
    /* this.arr = this.nodes;
     this.arr.forEach(obj => {
       this.renameKey(obj, 'id', 'key');
       this.renameKey(obj, 'name', 'title');
     }
     );
     console.log("json", JSON.stringify(this.arr));
 */
  }

  initfulltree() {
    this._FulltreeSubscription = this.structureservice.getSubtree().subscribe(
      res => {
        console.log("tree", res);
        this.Fulltree = res;
        this.nodes.push(this.Fulltree);

        this.options = {

          getNodeClone: (node) => ({
            ...node.data,
            key: v4(),
            name: `copy of ${node.data.name}`
          }),
          isExpandedField: 'expanded',
          idField: 'uuid',
          hasChildrenField: 'nodes',
          actionMapping: {
            mouse: {
              dblClick: (tree, node, $event) => {
                alert(`This is ${node.data.id}`);
                let req = new IdRequest(node.data.id, null, null);

                this.getStructureById(req);
              }
            },
            keys: {
              [KEYS.ENTER]: (tree, node, $event) => {
                node.expandAll();
              }
            }
          },

          nodeHeight: 23,
          allowDrag: (node) => {
            return true;
          },
          allowDrop: (node) => {
            return true;
          },
          allowDragoverStyling: true,
          levelPadding: 10,
          useVirtualScroll: false,
          animateExpand: true,
          scrollOnActivate: false,
          animateSpeed: 30,
          animateAcceleration: 1.2,
          //scrollContainer: document.documentElement // HTML
        }




        this.state = {
          expandedNodeIds: {
            1: true,
            2: true
          },
          hiddenNodeIds: {},
          activeNodeIds: {}
        }


      },
      error => {
        console.log(error);
        this.notifyService.showError("Chargement de la liste des structure", "Erreur !!");
      }
    );
  }

  onMoveNode($event) {

    Swal.fire({
      title: 'vérifier avant',
      text: 'confirmer le déplacement de la structure',
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

        console.log(
          "Moved",
          $event.node.key,
          "to",
          $event.to.parent.key,
          "at index",
          $event.to.index);
        this.Idreq = new IdRequest(null, $event.node.key, $event.to.parent.key);
        this.Idreq.id = null;
        this.Idreq.key = $event.node.key;
        this.Idreq.parentid = $event.to.parent.key
        this._mouveSubscription = this.structureservice.mouveStructure(this.Idreq).subscribe(
          res => {
            console.log("mouvement tree", res);
            this.notifyService.showSuccess("mouvement de la structure", "Succées !!");
          },
          error => {
            console.log(error);
            this.notifyService.showError("mouvement de la structure", "Erreur !!");
          }
        );


      }

    })

  }


  /*loop(level) {
    return function (a) {
      var i = level, s = '';
      while (i--) {
        s += '----';
      }
      if (level) {
        s += '*';
      }
      if (a.id) {
        console.log(s + a.id + ' ' + a.name);
  
        Array.isArray(a[0].children) && a[0].children.forEach(this.loop(level + 1));
      }
      else {
        console.log("error");
      }
  
    }
    
  }
  */
  //var data = [{ "yang_type": "container", "name": "c1", "value": "", "children": [{ "yang_type": "", "name": "type", "value": "Uint32", "children": [] }, { "yang_type": "list", "name": "DNS", "value": "", "children": [{ "name": "type", "value": "String", "children": [], "yang_type": "" }, { "yang_type": "leaf", "name": "ip-address", "value": "", "children": [{ "name": "type", "value": "string", "children": [], "yang_type": "" }] }, { "yang_type": "leaf", "name": "Domain", "value": "", "children": [{ "name": "type", "value": "string", "children": [], "yang_type": "" }] }] }] }];



  renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];

    for (const k in obj["children"]) {
      if (k === "name") {
        obj["children"][0]["newKeyName"] = obj["children"][0][k];
        delete obj["children"][0][k];
      }


    }
  }

  deletstructure(id) {

    Swal.fire({
      title: 'vérifier avant',
      text: 'confirmer la suppression de la structure',
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

        this._delStructureByIdSubscription = this.structureservice.deleteStructure(id).subscribe(
          res => {
            console.log("delet structure", res);
            this.notifyService.showSuccess("supression de la structure", "Succées !!");
            //this.router.navigate(['/profile/admin/structure']);
            this.router.navigateByUrl('/ListeComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['profile/admin/structure']);
            });
          },
          error => {
            console.log(error);
            this.notifyService.showError("supression de la structure", "Erreur !!");
          }
        )


      }

    })


  }
  getStructureById(reqId: IdRequest) {
    this._StructureByIdSubscription = this.structureservice.getStructureById(reqId).subscribe(
      res => {
        console.log("get structure", res);
        this.detailstructure = res;
        if (Object.keys(this.detailstructure).length != 0) {
          this.showdetail = true;
        }
      },
      error => {
        console.log(error);
        this.notifyService.showError("detail de la structure", "Erreur !!");
      }
    )
  };

  ngOnDestroy() {
    if (this._mouveSubscription != null) {
      this._mouveSubscription.unsubscribe();
    }
    if (this._subtreeSubscription != null) {
      this._subtreeSubscription.unsubscribe();
    }
    if (this._FulltreeSubscription != null) {
      this._FulltreeSubscription.unsubscribe();
    }
    if (this._StructureByIdSubscription != null) {
      this._StructureByIdSubscription.unsubscribe();
    }
    if (this._delStructureByIdSubscription != null) {
      this._delStructureByIdSubscription.unsubscribe();
    }

  }

}
