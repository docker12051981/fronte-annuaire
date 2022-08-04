import { Component, Input } from '@angular/core';
import { faStar, faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {

  faStar = faStar;
  faPlus = faPlus;
  faHome = faHome;
  @Input() heading;
  @Input() subheading;
  @Input() icon;

  constructor(private router: Router) {

  }

  goPlaces() {
   // this.router.navigateByUrl('/dashboard/');
    this.router.navigate(['/dashboard/']);
  }

}
