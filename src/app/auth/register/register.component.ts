import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { Router } from '@angular/router';
//import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  fullName = '';
  email = '';
  password = '';
  isLoadingResults = false;
  //matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'fullName': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.submitted = true;
   /* this.authService.register(form)
      .subscribe(res => {
        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
      });*/
  }

}
