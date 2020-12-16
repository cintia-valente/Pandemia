import { PacienteModel } from '../model/pacienteModel';
import { Paciente } from '../../entidades/paciente';
import { ConnectionStates } from "mongoose";

export class PacienteRepositorio {

    static async adicionarPaciente(Paciente: Paciente ): Promise<Paciente>{
        return PacienteModel.create(Paciente);
    }

    static async buscarPaciente(): Promise<Paciente[]>{
        let consulta = PacienteModel.find().populate('pacientes', PacienteModel);
        return consulta.exec();
    }

    static async buscarPacientePorId(id: string): Promise<Paciente | any>{
        let consulta = await PacienteModel.findById(id).populate('pacientes', PacienteModel).exec();
        if( consulta != null){
           return consulta;
        } else{
            throw new Error('Id inexistente.');
        }
    }

    static async buscarPacientePorNome(nome: string): Promise<Paciente[] | any>{
        let consulta = await PacienteModel.find().where("nome").equals(nome).exec();
        if(consulta != null){
            return consulta;
        } else {
            throw new Error('Nome inexistente.');
        }
    }

    static async atualizarPaciente(id: string , paciente: Paciente): Promise<Paciente>{
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

    static async excluirPaciente (id: string): Promise<Paciente>{
       let exclui = await PacienteModel.findById(id).exec();
       if(exclui != null){
           return exclui.remove();
       } else {
        throw new Error('Id inexistente.');
       }
    }
}
