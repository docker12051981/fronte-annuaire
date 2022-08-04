import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'Annuaire des structures et des fonctionnaires';


  constructor(private router: Router) {

  }



}
