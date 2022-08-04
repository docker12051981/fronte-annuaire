/**
* generate tooltipe for smarte table actions
* @param  data source
* @author Hmedi Karim
*/
import { Injectable } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class SmartactionService {

  constructor(/*private translateService: TranslateService*/) {
    var retrievedObject = localStorage.getItem('config');
    //translateService.use(JSON.parse(retrievedObject).lang);
  }

  tooltipeAction() {
    this.tooltipe('edit');
    this.tooltipe('delete');
    this.tooltipe('add');
    this.tooltipe('edit-cancel');
    this.tooltipe('view');
  }

  myfn() {
    // alert("test");
  }

  addcancelsavetooltipe() {

    let icone = '<i class="fas fa-times text-danger" aria-hidden="true" ></i>';
    let parentclasse = 'ng2-smart-action-add-cancel';

    let iconesave = '<i class="fas fa-check text-success" aria-hidden="true"></i>';
    let parentclassesave = 'ng2-smart-action-add-create';

    setTimeout(() => {

      const demoClasses = document.querySelectorAll(`.add-cancel`);
      const parentelm = document.querySelectorAll(`.${parentclasse}`);

      const demoClassessave = document.querySelectorAll(`.add-save`);
      const parentelmsave = document.querySelectorAll(`.${parentclassesave}`);

      demoClasses.forEach(element => {

        element.innerHTML = icone;
        element.setAttribute("data-tooltip-text", "annuler");
        element.setAttribute("id", "cancelbtn");


      });

      parentelm.forEach(elementparent => {
        elementparent.classList.remove(`${parentclasse}`);
      });


      demoClassessave.forEach(element => {

        element.innerHTML = iconesave;

        element.setAttribute("data-tooltip-text", "sauvegarder");

      });

      parentelmsave.forEach(elementparent => {
        elementparent.classList.remove(`${parentclassesave}`);
      });

    }, 0);


  }

  editcancelsavetooltipe() {

    let icone = '<i class="fas fa-times text-danger" aria-hidden="true" ></i>';
    let parentclasse = 'ng2-smart-action-edit-cancel';

    let iconesave = '<i class="fas fa-check text-success" aria-hidden="true"></i>';
    let parentclassesave = 'ng2-smart-action-edit-save';

    setTimeout(() => {

      const demoClasses = document.querySelectorAll(`.edit-cancel`);
      const parentelm = document.querySelectorAll(`.${parentclasse}`);

      const demoClassessave = document.querySelectorAll(`.edit-save`);
      const parentelmsave = document.querySelectorAll(`.${parentclassesave}`);



      demoClasses.forEach(element => {

        element.innerHTML = icone;

        element.setAttribute("data-tooltip-text", "annuler");

      });

      parentelm.forEach(elementparent => {
        elementparent.classList.remove(`${parentclasse}`);
      });


      demoClassessave.forEach(element => {

        element.innerHTML = iconesave;

        element.setAttribute("data-tooltip-text", "sauvegarder");

      });

      parentelmsave.forEach(elementparent => {
        elementparent.classList.remove(`${parentclassesave}`);
      });

    }, 0);


  }


  tooltipe(classe) {
    let icone = "";
    let parentclasse = "";
    if (classe === "edit") {

      icone = '<i class="fas fa-pencil-alt text-primary mr-1" aria-hidden="true"></i>';
      parentclasse = 'ng2-smart-action-edit-edit';
    }
    if (classe === "delete") {

      icone = '<i class="far fa-trash-alt  text-danger" aria-hidden="true"></i>';
      parentclasse = 'ng2-smart-action-delete-delete';
    }

    if (classe === "edit-cancel") {
      icone = '<i class="fas fa-times  text-danger mr-1" aria-hidden="true"></i>';
      parentclasse = 'ng2-smart-action-edit-cancel';
    }

    if (classe === "add-cancel") {

      icone = '<i class="fas fa-times  text-danger mr-1" aria-hidden="true"></i>';
      parentclasse = 'ng2-smart-action-add-cancel';
    }

    if (classe === "add") {
      parentclasse = 'ng2-smart-action-add-add';
    }

    if (classe === "view") {
      icone = '<i class="fa fa-eye fa-m text-info mr-1" aria-hidden="true"></i>';
      parentclasse = 'ng2-smart-action-custom-custom';
    }

    setTimeout(() => {

      const demoClasses = document.querySelectorAll(`.${classe}`);
      const parentelm = document.querySelectorAll(`.${parentclasse}`);

      if (classe === "add") {

        icone = '<i class="fas fa-plus-circle fa-2x"></i>';
        parentclasse = 'ng2-smart-action-delete-delete';

        parentelm.forEach(element => {

          element.innerHTML = icone;

          element.setAttribute("data-tooltip-text", classe);
          element.addEventListener("click", this.addcancelsavetooltipe, false);

        });

      }

      /*     if(classe==="view")
           {
             
           //icone='<i  class="test fa fa-plus-circle fa-m text-success" aria-hidden="true"></i>';
         //  parentclasse='ng2-smart-action-delete-delete';
     
           parentelm.forEach(element => {
            
             element.innerHTML = icone;
             
            // element.setAttribute("data-tooltip-text", this.translateService.instant(classe));
             element.addEventListener ("click", this.setaction, false);
             
           });
     
           }
  */
      else {

        demoClasses.forEach(element => {

          element.innerHTML = icone;
          element.setAttribute("data-tooltip-text", classe);
          element.addEventListener("click", this.editcancelsavetooltipe, false);

        });

        parentelm.forEach(elementparent => {
          elementparent.classList.remove(`${parentclasse}`);
        });

      }

    }, 0);
  }


}
