import { Component } from '@angular/core';
import { DataSharingService } from './services/data-sharing.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Desafio Pandemia';
  isChecked = false;
  isLogged:boolean= this.AuthService.isLogged();
  
  constructor(private AuthService: AuthService,private dataSharingService: DataSharingService){
    console.log('logado:',this.isLogged);
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
    this.isLogged = value;
    console.log('logado:',this.isLogged);
  });
  }
  OnLogout(){
    this.AuthService.logout();
    this.dataSharingService.isUserLoggedIn.next(false);
  }
  OnLogin(){
    this.dataSharingService.isUserLoggedIn.next(true);
  }
}
