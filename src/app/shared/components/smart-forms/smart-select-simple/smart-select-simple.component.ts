import { Component, ViewChild, ElementRef } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { SharedService } from "src/app/shared/services/shared/shared.service";
@Component({
  selector: 'select-editor',
  template: `
    <select #name [ngClass]="'inputClass'"
            class="form-control" 
            style="padding: 0.1rem 0.75rem !important;"
            [(ngModel)]="cell.newValue"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">
            <option value="" disabled selected>{{title}}</option>
        <option *ngFor="let option of data" [value]="option.value">{{ option.title}}</option>
    </select>
    `
})

export class SmartSelectSimpleComponent extends DefaultEditor {

  @ViewChild('name', { static: false }) name: ElementRef;
  data: any;
  datalist: any;
  textdefault: string;
  title: string;
  ngAfterViewInit() {
    // <option value="" disabled selected>{{title}}</option>
    let value = this.cell.getValue();
    if (value != "") {
      this.cell.newValue = value;
    }

  }

  constructor(private sharedService: SharedService) {
    super();

    this.sharedService.sharedList.subscribe(data => this.datalist = data);
    this.data = this.datalist;
    console.log("data shared")
    console.log(this.data)
    this.sharedService.sharedText.subscribe(data => this.textdefault = data);
    this.title = this.textdefault;

  }

}
