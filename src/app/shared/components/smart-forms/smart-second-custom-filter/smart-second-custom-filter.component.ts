/**
   * @author Hmedi karim
   * @description component for dropdown filter fonction generale
  */

import { Component, OnChanges, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DefaultFilter, Cell } from 'ng2-smart-table';
import { SharedService } from "src/app/shared/services/shared/shared.service";

@Component({
  template: `

  <select #second [ngClass]="'inputClass'"
  class="form-control filtrs"
  style="padding: 0.1rem 0.75rem !important;"
  [formControl]="inputControl"
 >
  <option value="" selected>الكل</option>
<option *ngFor="let option of data" [value]="option.value"
>{{ option.title}}
</option>
</select>

  `,
})
export class SmartSecondCustomFilterComponent extends DefaultFilter implements OnInit, OnChanges {

  inputControl = new FormControl();
  FNG: any;
  data: any;
  list: any;
  constructor(private sharedService: SharedService) {
    super();
    this.sharedService.sharedList.subscribe(data => this.list = data);
    this.data = this.list;
    console.log("data render", this.data);
  }

  ngOnInit() {

    this.inputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(this.delay),
      )
      .subscribe((value: number) => {
        console.log("value render", value);
        this.query = value !== null ? this.inputControl.value.toString() : '';
        this.setFilter();
      });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.query) {
      console.log("query", changes.query);
      this.query = changes.query.currentValue;
      this.inputControl.setValue(this.query);
    }
  }

}
