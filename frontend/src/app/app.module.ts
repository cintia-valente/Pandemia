import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuardService } from './guards/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CadastrarAtendimentoComponent } from './cadastrar-atendimento/cadastrar-atendimento.component';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    CadastrarAtendimentoComponent,
    CadastrarPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
