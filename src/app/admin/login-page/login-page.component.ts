import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup = new FormGroup(
    {email: new FormControl(null, [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required, 
      Validators.minLength(3)
    ])}
  );

  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
  }



  submit() {
    if (this.form.invalid)
    return;

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin','dashboard'])
      this.submitted = false;
    })
  }

}
