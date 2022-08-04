import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-structure',
  templateUrl: './admin-structure.component.html',
  styleUrls: ['./admin-structure.component.sass']
})
export class AdminStructureComponent implements OnInit {
  showstruct: boolean = false;
  showfonctionnaire = false;
  showuser = false;
  url: any;
  cat: 'structure';
  heading = 'Dashboard Administrateur de structure';
  subheading = 'Espace Administrateur permet de visualiser et de gerer les structures , les fonctionnaires';
  icon = 'pe-7s-display2';
  constructor(private router: Router, ) { }

  ngOnInit(): void {
    this.url = this.router.url;
  }

}
