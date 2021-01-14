import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AtendimentoService } from '../services/atendimento.service';
import { Atendimento } from '../entidades/atendimento';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entidades/paciente';
import { UnidadeService } from '../services/unidade.service';
import { Unidade } from '../entidades/unidade';

interface Contagio {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-cadastrar-atendimento',
  templateUrl: './cadastrar-atendimento.component.html',
  styleUrls: ['./cadastrar-atendimento.component.scss']
})
export class CadastrarAtendimentoComponent implements OnInit {

  registerForm: FormGroup;
  selectedContagio: boolean;
  parametroCarregado = false;
  end: Number;
  start: Number;
  atendimento: Atendimento;
  paciente: Paciente[];
  unidade: Unidade[];
  isLoading = true;
  tempo: number;
  error = false;
  pacienteCarregado: Paciente[];
  unidadeCarregada: Unidade[];

  possibilidadeContagio:  Contagio[] = [
    {value: true, viewValue: 'Positivo'},
    {value: false, viewValue: 'Negativo'},
  ];

  contagios: Contagio[] = [
    {value: true, viewValue: 'Positivo'},
    {value: false, viewValue: 'Negativo'},
    {value: false, viewValue: 'Não realizado'},
  ];

  constructor(
    private atendimentoService: AtendimentoService,
    private pacienteService: PacienteService,
    private unidadeService: UnidadeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router
  ) {

    this.registerForm = this.formBuilder.group({
      unidades: [''],
      pacientes: [''],
      data: ['', Validators.required],
      possibContagio: ['', Validators.required],
      teste1: [''], 
      teste2: [''],
      tempo: ['', Validators.required]
    });
    
  }

  get possibContagio() {
    return this.registerForm.get('possibContagio').value == 'true';
  }

  get teste1() {
    return this.registerForm.get('teste1').value == 'true';
  }
  get teste2() {
    return this.registerForm.get('teste2').value;
  }

  getSelectedPaciente(): void {
    this.pacienteService
      .getPacientes()
      .subscribe((paciente => (this.pacienteCarregado = paciente)));
  }

  getSelectedUnidade(): void {
    this.unidadeService
      .getUnidades()
      .subscribe((unidade => (this.unidadeCarregada = unidade)));
  }
  
  ngOnInit() {
    this.getSelectedPaciente();
    this.getSelectedUnidade();
    this.carregarLocalStorage();
    this.start = Date.now();
  }

  carregarLocalStorage() {
    const unitId = localStorage.getItem('unidades');
    this.registerForm.get('unidades').setValue(unitId);

    const paciente = localStorage.getItem('pacientes');
    this.registerForm.get('pacientes').setValue(paciente);

    const dataAtendimento = localStorage.getItem('data');
    this.registerForm.get('data').setValue(dataAtendimento);

    const possibContagio = localStorage.getItem('possibContagio');
    this.registerForm.get('possibContagio').setValue(possibContagio);

    const teste1 = localStorage.getItem('teste1');
    this.registerForm.get('teste1').setValue(teste1);

    const teste2 = localStorage.getItem('teste2');
    this.registerForm.get('teste2').setValue(teste2);

    const tempoAtendimento = localStorage.getItem('tempo');
    this.registerForm.get('tempo').setValue(tempoAtendimento);
  }

  salvarLocalStorage(key:string): void {
    localStorage.setItem(key, this.registerForm.get(key).value);
  }

  submitAtendimento() {
    this.end = Date.now();
    const data = new Date();
  
    let atendimento: Atendimento = {
      idUnidade: this.registerForm.get('unidades').value,
      data: this.registerForm.get('data').value,
      paciente: this.registerForm.get('pacientes').value,
      tempo: this.registerForm.get('tempo').value,
      possibContagio: this.registerForm.get('possibContagio').value,
      teste1: this.registerForm.get('teste1').value,
      teste2: this.registerForm.get('teste2').value
    };
    if(this.teste2 == "") {

    }else {
      atendimento.teste2 = this.teste2 == "true";
    }
    
    console.log(atendimento);
   //this.isLoading = true;
    this.atendimentoService.postAtendimento(atendimento).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/cadastrar-atendimento', {saved: true}]);
        alert('Consulta cadastrada com sucesso');
      },
      () => {
        this.error = true;
      }
    );
  } 
}