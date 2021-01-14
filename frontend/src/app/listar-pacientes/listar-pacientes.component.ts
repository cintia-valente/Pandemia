import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entidades/paciente';
import { UnidadeService } from '../services/unidade.service';
import { Unidade } from '../entidades/unidade';
import { AtendimentoService } from '../services/atendimento.service';
import { Atendimento } from '../entidades/atendimento';

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
  
  constructor(
    private unidadeService: UnidadeService,
    private atendimentoService: AtendimentoService,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService
  ) {

    this.listForm = this.formBuilder.group({
      unidade: ['', Validators.required],
      paciente: ['', Validators.required],
      data: [''],
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
      this.atendimentoService.getAtendimentoPorUnidade(this.listForm.get('unidade').value).subscribe({
        next: atendimentosEncontrados => {
          atendimentosEncontrados.forEach(atendimento => {
            const atendimentoPaciente = atendimento.paciente as Paciente
            console.log(atendimento)
          // Verifica se o paciente já está na lista para adicionar
          if (this.paciente.every(paciente => paciente._id !== atendimentoPaciente._id)){
              this.paciente.unshift(atendimentoPaciente);
              console.log(atendimento)
          }
        });
      }, 
    });
  }
}
