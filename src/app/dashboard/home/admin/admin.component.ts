import { Component, OnInit } from '@angular/core';
import { faTh, faCheck, faTrash, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  showstruct: boolean = false;
  showfonctionnaire = false;
  showuser = false;
  url: any;
  cat: 'structure';
  heading = 'Dashboard Administrateur Central';
  subheading = 'Espace Administrateur permet de visualiser et de gerer les structures , les fonctionnaires et les utilisateurs';
  icon = 'pe-7s-display2';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.url = this.router.url;
  }




  showoptions(option) {

    //alert(option)
    // this.router.navigateByUrl(option);

  }

}
