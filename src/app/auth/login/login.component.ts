import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CredentialsDto } from 'src/app/shared/models/auth/credentials-dto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  message: string = "";
  creadantial: CredentialsDto;
  submitted = false;
  loginForm: FormGroup;
  login = '';
  password = '';
  /* matcher = new MyErrorStateMatcher();*/
  isLoadingResults = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {

    if (this.authService.currentUserValue) {

      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'login': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }
  onFormSubmit() {
    this.submitted = true;
    //alert("ok");
    this.creadantial = new CredentialsDto();
    this.creadantial.login = this.f.login.value;
    this.creadantial.password = this.f.password.value;
    this.authService.login(this.creadantial)
      .subscribe(res => {
       // alert("executed");
        console.log("karimtoken", res);
        if (Object.keys(res).length == 0) {
          this.message = "Erreur de connexion veuillez vérifier";
        }
        /*if (res.token) {
          localStorage.setItem('token', res.token);

        }*/
      }, (err) => {
        console.log(err);

      });
  }

}
