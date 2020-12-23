import { AtendimentoModel } from '../model/atendimentoModel';
import { Atendimento } from '../../entidades/atendimento';
import { ConnectionStates } from "mongoose";
import { PacienteModel } from '../model/pacienteModel';

export class AtendimentoRepositorio {

    static async getAtendimentos(): Promise<Atendimento[]> {
        let consulta = AtendimentoModel.find().populate('pacientes', PacienteModel);
        return consulta.exec();
    }

    //busca atendimentos por id
    static async getAtendimentoPorId(id: string): Promise<Atendimento | any> {
        let consulta = await AtendimentoModel.findById(id).populate('pacientes', PacienteModel).exec();
        if (consulta != null) {
            return consulta;
        } else {
            throw new Error('Id inexistente.');
        }
    }

    //busca atendimentos de uma unidade por id
    static async getAtendimentoUnidadePorId(id: string, andamento?: boolean): Promise<Atendimento[]> {
        let where = andamento ? { "resultTest2": undefined } : {};
        let atendimentos = await AtendimentoModel.find(where).populate("paciente").where("id").equals(id).exec();
        return atendimentos;
    }

    //Busca o tempo de determinada unidade
    static async getTempo(id: any, paciente?: boolean): Promise<any[]> {

        let tempos;
        if (paciente) {
            tempos = await AtendimentoModel.find().populate('pacientes').select('tempo').where('id').equals(id).exec();
        } else {
            tempos = await AtendimentoModel.find().select('tempo').where('id').equals(id).exec();

        }
        return tempos;
    }

    static async postAtendimento(atendimento: Atendimento): Promise<Atendimento> {
        return AtendimentoModel.create(atendimento);
    }

    static async patchAtendimento(id: string, atendimento: Atendimento): Promise<Atendimento> {
        let atualiza = await AtendimentoModel.findById(id).exec();
        if (atualiza != null) {
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

    static async deleteAtendimento(id: string): Promise<Atendimento> {
        let exclui = await AtendimentoModel.findById(id).exec();
        if (exclui != null) {
            return exclui.remove();
        } else {
            throw new Error('Id inexistente.');
        }
    }
}