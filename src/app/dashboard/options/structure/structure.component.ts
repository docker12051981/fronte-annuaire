import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodageTokenService } from 'src/app/shared/services/auth/decodage-token.service';
@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.sass']
})
export class StructureComponent implements OnInit {

  url: any;
  heading = 'Structure';
  subheading = 'Espace Administrateur permet de gerer les structures , les types et sous types';
  icon = 'pe-7s-albums';
  isAdmin_Centrale: boolean;
  isAdmin_Structure: boolean;
  isSimple_User: boolean;
  constructor(private router: Router, private decodagetokenService: DecodageTokenService) { }

  ngOnInit(): void {
    this.url = this.router.url;
    switch (this.decodagetokenService.getRoleUserToken()) {
      case "ADMIN_CENTRAL":
        this.isAdmin_Centrale = true;
        break;
      case "ADMIN_STRUCTURE":
        this.isAdmin_Structure = true;
        break;
      case "SIMPLE_USER":
        this.isSimple_User = true;
    }

  }

}
