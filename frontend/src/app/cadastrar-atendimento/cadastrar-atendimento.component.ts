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

  contagios: Contagio[] = [
    {value: true, viewValue: 'Positivo'},
    {value: false, viewValue: 'Negativo'}
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
      possibCont: ['', Validators.required],
      result1: [''], 
      result2: [''],
      tempo: ['', Validators.required]
    });
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

  get possibCont() {
    return this.registerForm.get('possibCont').value == 'true';
  }

  get result1() {
    return this.registerForm.get('result1').value == 'true';
  }
  get result2() {
    return this.registerForm.get('result2').value;
  }

  carregarLocalStorage() {
    const unitId = localStorage.getItem('unidades');
    this.registerForm.get('unidades').setValue(unitId);

    const idPaciente = localStorage.getItem('pacientes');
    this.registerForm.get('pacientes').setValue(idPaciente);

    const dataAtendimento = localStorage.getItem('data');
    this.registerForm.get('data').setValue(dataAtendimento);

    const possibCont = localStorage.getItem('possibCont');
    this.registerForm.get('possibCont').setValue(possibCont);

    const result1 = localStorage.getItem('result1');
    this.registerForm.get('result1').setValue(result1);

    const result2 = localStorage.getItem('result2');
    this.registerForm.get('result2').setValue(result2);

    const tempoAtendimento = localStorage.getItem('tempo');
    this.registerForm.get('tempo').setValue(tempoAtendimento);
  }

  salvarLocalStorage(key:string): void {
    localStorage.setItem(key, this.registerForm.get(key).value);
  }
  
  ngOnInit() {
    this.start = Date.now();
    this.getSelectedPaciente();
    this.getSelectedUnidade();
    this.carregarLocalStorage();
  }

  submitAtendimento() {
    this.end = Date.now();
    const data = new Date();
  
    let atendimento: Atendimento = {
      idUnidade: this.registerForm.get('unidades').value,
      data: this.registerForm.get('data').value,
      paciente: this.registerForm.get('pacientes').value,
      tempo: this.registerForm.get('tempo').value,
      possibContagio: this.registerForm.get('possibCont').value,
      teste1: this.registerForm.get('result1').value,
      teste2: this.registerForm.get('result2').value
    };
    if(this.result2 == "") {

    }else {
      atendimento.teste2 = this.result2 == "true";
    }
    
    console.log(atendimento);
    this.isLoading = true;
    this.atendimentoService.postAtendimento(atendimento).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/cadastrar-atendimento', {saved: true}]);
      },
      () => {
        this.error = true;
      }
    );

  }
}