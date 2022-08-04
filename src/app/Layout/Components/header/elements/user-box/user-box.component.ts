import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../../../theme-options';
import { DecodageTokenService } from 'src/app/shared/services/auth/decodage-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  profile: string;
  constructor(
    public globals: ThemeOptions, private router: Router,
    private decodagetokenService: DecodageTokenService

  ) {
    this.profile = decodagetokenService.profile;
  }

  ngOnInit() {
  }

  logout() {
    this.decodagetokenService.logout();
  }

}
