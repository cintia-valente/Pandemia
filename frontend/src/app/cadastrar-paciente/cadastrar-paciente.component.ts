import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entidades/paciente';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit {

  paciente: Paciente;
  isLoading = false;
  selectedGender: string;

  genders: Gender[] = [
    { value: 'M', viewValue: 'Masculino' },
    { value: 'F', viewValue: 'Feminino' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  public pacienteForm = this.formBuilder.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}[-/][0-9]{2}$/)]],
    email: ['', Validators.required],
    sexo: ['', Validators.maxLength],
    peso: ['', Validators.maxLength],
    altura: ['', Validators.maxLength],
  });

  public pacienteEnderecoForm = this.formBuilder.group({
    rua: ['', Validators.required],
    numero: ['', Validators.required],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
  });

  enviarForm() {
    const paciente: Paciente = {
      nome: this.nome.value,
      cpf: this.cpf.value,
      idade: this.idade.value,
      telefone: this.telefone.value,
      email: this.email.value,
      sexo: this.sexo.value,
      peso: this.peso.value,
      altura: this.altura.value,
     // endereco: this.endereco.value,
    }
    this.pacienteService.postPaciente(paciente).subscribe({
      next: paciente => {
        this.router.navigate(['../cadastrar-paciente'])
      }
    })
  }


  get nome() {
    return this.pacienteForm.get('nome');
  }

  get cpf() {
    return this.pacienteForm.get('cpf');
  }

  get idade() {
    return this.pacienteForm.get('idade');
  }

  get telefone() {
    return this.pacienteForm.get('telefone');
  }

  get email() {
    return this.pacienteForm.get('email');
  }

  get sexo() {
    return this.pacienteForm.get('sexo');
  }

  get peso() {
    return this.pacienteForm.get('peso');
  }

  get altura() {
    return this.pacienteForm.get('altura');
  }

  get rua() {
    return this.pacienteEnderecoForm.get('rua');
  }

  get numero() {
    return this.pacienteEnderecoForm.get('numero');
  }

  get bairro() {
    return this.pacienteEnderecoForm.get('bairro');
  }

  get cidade() {
    return this.pacienteEnderecoForm.get('cidade');
  }

  ngOnInit() {
  }


}
