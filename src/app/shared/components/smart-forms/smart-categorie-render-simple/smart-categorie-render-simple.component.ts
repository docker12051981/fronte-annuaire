/**
  * @author Hmedi karim
  * @description component for render reutilisable view
 */

import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { SharedService } from "src/app/shared/services/shared/shared.service";

@Component({
  selector: 'app-smart-categorie-render-simple',
  template: '<p class="text-left">{{renderValue}}</p>',
})
export class SmartCategorieRenderSimpleComponent implements OnInit {
  data: any;
  datalist: any;
  constructor(private sharedService: SharedService) { }
  renderValue: string;
  @Input() value: string;
  @Input() rowData: any;
  ngOnInit() {
    this.sharedService.sharedList.subscribe(data => this.datalist = data);
    this.data = this.datalist;
    console.log("rowdata", this.rowData);
    this.data.forEach(element => {
      if (this.rowData.typecontrat.id == element.value) {
        this.renderValue = element.title;
      }

    });

  }

}
