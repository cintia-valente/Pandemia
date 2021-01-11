import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastrarAtendimentoComponent } from './cadastrar-atendimento/cadastrar-atendimento.component';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';

import { AuthGuardService } from './guards/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-atendimento', component: CadastrarAtendimentoComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService]},
  { path: 'cadastrar-paciente', component: CadastrarPacienteComponent, canActivate: [AuthGuardService], canLoad: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
