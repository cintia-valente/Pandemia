import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 login = false

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private AuthService: AuthService, 
    private app: AppComponent) {

  }
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  getEmail() {return this.loginForm.get('email'); }

  getPassword() {return this.loginForm.get('password'); }

  ngOnInit() {
  }
  
  onSubmit() {
    try{
      this.AuthService.postLogin({email: this.getEmail().value, password: this.getPassword().value}).subscribe(data =>{
        let idtoken = data.idtoken;
        localStorage.setItem('token', idtoken);

        let user = data.user.name;
        localStorage.setItem('user',user);
        localStorage.setItem('unitid',data.user.unitid);

        this.app.OnLogin();
        this.router.navigate(['cadastrar-atendimento']);
      });
    }catch(err){
      alert('erro');
      console.log(err);
    }
  }
}
