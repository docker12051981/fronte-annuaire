/**
* shared service when we can put to it and we can read all there methods , variables from all other subscribed components
* @author KARIM HMEDI
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private datalist = new BehaviorSubject('data liste');
  sharedList = this.datalist.asObservable();

  private conditiondatalist = new BehaviorSubject('condition data liste');
  sharedconditionList = this.conditiondatalist.asObservable();

  private expectedconditiondatalist = new BehaviorSubject('condition data liste');
  sharedexpectedconditionList = this.expectedconditiondatalist.asObservable();

  private actiondatalist = new BehaviorSubject('action data liste');
  sharedactionList = this.actiondatalist.asObservable();

  private actiondataSupplist = new BehaviorSubject('action supp liste');
  sharedSuppList = this.actiondataSupplist.asObservable();

  private datalistdefault = new BehaviorSubject('data liste default');
  sharedListdefault = this.datalistdefault.asObservable();

  private option = new BehaviorSubject(0);
  sharedoption = this.option.asObservable();

  private text = new BehaviorSubject('إختيار');
  sharedText = this.text.asObservable();

  private conditiontext = new BehaviorSubject('إختيار');
  sharedconditionText = this.conditiontext.asObservable();

  private actiontext = new BehaviorSubject('إختيار');
  sharedactionText = this.actiontext.asObservable();


  private customfilter = new BehaviorSubject(false);
  sharedcustomfilter = this.customfilter.asObservable();

  private reloadinit = new BehaviorSubject(false);
  sharedreloadinit = this.reloadinit.asObservable();
  private dataNgSelect = new BehaviorSubject('');
  shareddataNgSelect = this.dataNgSelect.asObservable();

  private textNgSelect = new BehaviorSubject('');
  sharedTextNgSelect = this.textNgSelect.asObservable();
  private error = new BehaviorSubject(false);
  sharederror = this.error.asObservable();

  private typedefaulttextoption = new BehaviorSubject('إختيار');
  shareddatatypedefaulttextoption = this.typedefaulttextoption.asObservable();

  private typedefaultvalueoption = new BehaviorSubject('');
  shareddatatypedefaultvalueoption = this.typedefaultvalueoption.asObservable();

  private typedefaultaddtextoption = new BehaviorSubject('إختيار');
  shareddatatypedefauladdttextoption = this.typedefaultaddtextoption.asObservable();

  private typedefaultaddvalueoption = new BehaviorSubject('');
  shareddatatypedefauladdtvalueoption = this.typedefaultaddvalueoption.asObservable();
  constructor() { }

  senddatatypedefaulttextoption(data: any) {
    this.typedefaulttextoption.next(data)
  }

  senddatatypedefaultvalueoption(data: any) {
    this.typedefaultvalueoption.next(data)
  }

  senddatatypedefaultaddtextoption(data: any) {
    this.typedefaultaddtextoption.next(data)
  }

  senddatatypedefaultaddvalueoption(data: any) {
    this.typedefaultaddvalueoption.next(data)
  }

  sendcustomfilter(data: any) {
    this.customfilter.next(data)
  }

  sendreloadinit(data: any) {
    this.reloadinit.next(data)
  }

  senderror(data: any) {
    this.error.next(data)
  }

  simpledatalist(data: any) {
    this.datalist.next(data)
  }

  defaultdatalist(data: any) {
    this.datalistdefault.next(data)
  }


  simpleconditiondatalist(data: any) {
    this.conditiondatalist.next(data)
  }

  expecteddatalist(data: any) {
    this.expectedconditiondatalist.next(data)
  }

  simpleactiondatalist(data: any) {
    console.log("simple action data liste");
    this.actiondatalist.next(data)
  }

  ngSelectSimpleDataList(data: any) {
    this.dataNgSelect.next(data)
  }

  defaulttextNgSelect(data: any) {
    this.textNgSelect.next(data)
  }

  textlist(message: string) {
    this.text.next(message)
  }

  conditiontextlist(message: string) {
    this.conditiontext.next(message)
  }

  actiontextlist(message: string) {
    this.actiontext.next(message)
  }

  defaultoption(value: number) {
    this.option.next(value)
  }

}
