import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fonctionnaire',
  templateUrl: './fonctionnaire.component.html',
  styleUrls: ['./fonctionnaire.component.sass']
})
export class FonctionnaireComponent implements OnInit {

  heading = 'Fonctionnaires';
  subheading = 'Espace Administrateur permet de gerer les fonctionnaires , les fonctions , les grades et les catégories';
  icon = 'pe-7s-albums';
  constructor() { }

  ngOnInit(): void {
  }

}
