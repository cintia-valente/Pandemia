import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entidades/paciente';
import { UnidadeService } from '../services/unidade.service';
import { Unidade } from '../entidades/unidade';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.scss']
})
export class ListarPacientesComponent implements OnInit {

  listForm: FormGroup;
  paciente: Paciente[];
  unidade: Unidade[];
  selectedUnidade: string;
  //displayedColumns = ['nome', 'cpf', 'idade', 'telefone', 'email', 'sexo', 
    //                  'peso', 'altura', 'rua', 'numero', 'bairro', 'cidade'];
  
  constructor(
    private unidadeService: UnidadeService,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService
  ) {

    this.listForm = this.formBuilder.group({
      unidades: [''],
      pacientes: [''],
      data: ['', Validators.required],
      possibContagio: ['', Validators.required],
      teste1: [''], 
      teste2: [''],
      tempo: ['', Validators.required]
    });
  }

  getSelectedUnidade(): void {
    this.unidadeService
      .getUnidades()
      .subscribe((unidade => (this.unidade = unidade)));
  }

  ngOnInit(): void {
    this.getSelectedUnidade();
  }

  submit(): void {
    this.paciente = [];
      this.pacienteService.getPacientes().subscribe({
        next: pacienteEncontrado => {
          // Verifica se o paciente já nao esta na lista para adicionar
          if (this.paciente.every(paciente => paciente.id !== pacienteEncontrado.id)){
              this.paciente.unshift(pacienteEncontrado);
          }
        },
      });
    }
  }
