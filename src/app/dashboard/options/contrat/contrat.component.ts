import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.sass']
})
export class ContratComponent implements OnInit {

  heading = 'Contrats';
  subheading = 'Espace Administrateur permet de gerer les contrats , les types , les fournisseurs, les intervenants';
  icon = 'pe-7s-file';
  constructor() { }

  ngOnInit(): void {
  }

}
