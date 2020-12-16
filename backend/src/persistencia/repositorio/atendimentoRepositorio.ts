import { AtendimentoModel } from '../model/atendimentoModel';
import { Atendimento } from '../../entidades/atendimento';
import { ConnectionStates } from "mongoose";
import { PacienteModel } from '../model/pacienteModel';

export class AtendimentoRepositorio {

    static async adicionarAtendimento(Atendimento: Atendimento ): Promise<Atendimento>{
        return AtendimentoModel.create(Atendimento);
    }

    static async buscarAtendimento(): Promise<Atendimento[]>{
        let consulta = AtendimentoModel.find().populate('pacientes', PacienteModel);
        return consulta.exec();
    }

    static async buscarAtendimentoPorId(id: string): Promise<Atendimento | any>{
        let consulta = await AtendimentoModel.findById(id).populate('pacientes', PacienteModel).exec();
        if( consulta != null){
           return consulta;
        } else{
            throw new Error('Id inexistente.');
        }
    }

    static async buscarAtendimentoPorNome(nome: string): Promise<Atendimento[] | any>{
        let consulta = await AtendimentoModel.find().where("nome").equals(nome).exec();
        if(consulta != null){
            return consulta;
        } else {
            throw new Error('Nome inexistente.');
        }
    }

    static async atualizarAtendimento(id: string , atendimento: Atendimento): Promise<Atendimento>{
        let atualiza = await AtendimentoModel.findById(id).exec();
        if(atualiza != null){
            atualiza.paciente = atendimento.paciente;
            atualiza.data = atendimento.data;
            atualiza.possibContagio = atendimento.possibContagio;
            atualiza.teste1 = atendimento.teste1;
            atualiza.teste2 = atendimento.teste2;
            atualiza.tempo = atendimento.tempo;
            return atualiza.save();
        } else {
            throw new Error('Id inexistente.');
        }
    }

    static async excluirAtendimento (id: string): Promise<Atendimento>{
       let exclui = await AtendimentoModel.findById(id).exec();
       if(exclui != null){
           return exclui.remove();
       } else {
        throw new Error('Id inexistente.');
       }
    }
}
