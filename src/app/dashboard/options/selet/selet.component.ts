import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-selet',
  templateUrl: './selet.component.html',
  styleUrls: ['./selet.component.sass']
})
export class SeletComponent implements OnInit {
  code: any;
  heading = 'Dashboard Administrateur';
  subheading = '';
  icon = 'pe-7s-display2';
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.params['codecat'];
    console.log("karim", this.code);
    switch (this.code) {
      case 'structure':
        this.heading = "Géstion des structures";
        this.subheading = "Gérer les structures , les types et les sous tyoes";
        this.icon = "pe-7s-box2";
        break;
      case 'fonctionnaire':
        this.heading = "Géstion des fonctionnaires";
        this.subheading = "Gérer les fonctionnaires , les fonctions, les grades et les categories";
        this.icon = "pe-7s-user";
        break;
      case 'utilisateur':
        this.heading = "Géstion des utilisateurs";
        this.subheading = "Gérer les utilisateurs , les roles, les groupes et les privilèges";
        this.icon = "pe-7s-users";
      case 'contrat':
        this.heading = "Géstion des contrats";
        this.subheading = "Gérer les contrats , les types, les fournisseurs";
        this.icon = "pe-7s-file";
      default:
    }

  }

}
