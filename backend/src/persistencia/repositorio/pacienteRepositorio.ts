import { PacienteModel } from '../model/pacienteModel';
import { Paciente } from '../../entidades/paciente';
import { ConnectionStates } from "mongoose";

export class PacienteRepositorio {

    static async getPacientes(): Promise<Paciente[]>{
        let paciente = await PacienteModel.find().exec();
        return paciente;
    }

    static async getPacientePorId(id: string): Promise<Paciente | any>{
        let paciente = await PacienteModel.findById(id).populate('pacientes', PacienteModel).exec();
        if( paciente != null){
           return paciente;
        } else{
            throw new Error('Id inexistente.');
        }
    }

    static async getPacientePorCpf(cpf: string): Promise<Paciente[] | any>{
        let paciente = await PacienteModel.find().where("cpf").equals(cpf).exec();
        if(paciente != null){
            return paciente;
        } else {
            throw new Error('Cpf inexistente.');
        }
    }

    static async postPaciente(paciente: Paciente): Promise<Paciente> {
        return await PacienteModel.create(paciente);
    }

    static async patchPaciente(id: string , paciente: Paciente): Promise<Paciente>{
        let atualiza = await PacienteModel.findById(id).exec();
        if(atualiza != null){
            atualiza.nome = paciente.nome;
            atualiza.cpf = paciente.cpf;
            atualiza.idade = paciente.idade;
            atualiza.telefone = paciente.telefone;
            atualiza.email = paciente.email;
            atualiza.sexo = paciente.sexo;
            atualiza.peso = paciente.peso;
            atualiza.altura = paciente.altura;
            atualiza.endereco = paciente.endereco;
            return atualiza.save();
        } else {
            throw new Error('Id inexistente.');
        }
    }

    static async deletePaciente (id: string): Promise<Paciente>{
       let exclui = await PacienteModel.findById(id).exec();
       if(exclui != null){
           return exclui.remove();
       } else {
        throw new Error('Id inexistente.');
       }
    }
}
