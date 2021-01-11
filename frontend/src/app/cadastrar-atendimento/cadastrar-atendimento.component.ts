import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AtendimentoService } from '../services/atendimento.service';
import { Atendimento } from '../entidades/atendimento';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entidades/paciente';

interface possibContagio {
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
  selectedGender: string;
  selectedContagio: boolean;
  parametroCarregado = false;
  end: Number;
  start: Number;
  atendimento: Atendimento;
  paciente: Paciente;
  isLoading = true;
  tempo: number;
  error = false;

  constructor(
    private atendimentoService: AtendimentoService,
    pacienteService: PacienteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router
  ) {

    this.registerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      possibCont: ['', Validators.required],
      result1: [''], 
      result2: [''],
    });
    route.paramMap.subscribe(
      (params: ParamMap) => {
        pacienteService.getPacientePorId(params.get('id')).subscribe(
          (paciente: Paciente) => {
            this.paciente = paciente;
            this.isLoading = false;
          }
        );
      }
    );
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

  ngOnInit() {
    this.start = Date.now();
  }

  onSubmit() {
    this.end = Date.now();
    const data = new Date();
    console.log(data);
  
    let atendimento: Atendimento = {
      idUnidade: localStorage.getItem('unitid'),
      idAtendimento: localStorage.getItem('atendid'),
      data: data,
      paciente: localStorage.getItem('idPaciente'),
      tempo: this.tempo,
      possibContagio: this.possibCont,
      teste1: this.result1

    };
    if(this.result2 == "") {

    }else {
      atendimento.teste2 = this.result2 == "true";
    }

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