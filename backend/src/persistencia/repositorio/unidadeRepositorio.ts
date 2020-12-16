import { UnidadeModel } from '../model/unidadeModel';
import { Unidade } from '../../entidades/unidade';
import { ConnectionStates } from "mongoose";
import { PacienteModel } from '../model/pacienteModel';

export class UnidadeRepositorio {

    static async adicionarUnidade(unidade: Unidade ): Promise<Unidade>{
        return UnidadeModel.create(unidade);
    }

    static async buscarUnidade(): Promise<Unidade[]>{
        let consulta = UnidadeModel.find().populate('pacientes', PacienteModel);
        return consulta.exec();
    }

    static async buscarUnidadePorId(id: string): Promise<Unidade | any>{
        let consulta = await UnidadeModel.findById(id).populate('pacientes', PacienteModel).exec();
        if( consulta != null){
           return consulta;
        } else{
            throw new Error('id inexistente');
        }
    }

    static async buscarUnidadePorNome(nome: string): Promise<Unidade[] | any>{
        let consulta = await UnidadeModel.find().where("nome").equals(nome).exec();
        if(consulta != null){
            return consulta;
        } else {
            throw new Error('nome inexistente');
        }
    }

    static async atualizarUnidade(id: string , unidade: Unidade): Promise<Unidade>{
        let atualiza = await UnidadeModel.findById(id).exec();
        if(atualiza != null){
            atualiza.nome = unidade.nome;
            atualiza.endereco = unidade.endereco;
            return atualiza.save();
        } else {
            throw new Error('id inexistente');
        }
    }

    static async excluirUnidade (id: string): Promise<Unidade>{
       let exclui = await UnidadeModel.findById(id).exec();
       if(exclui != null){
           return exclui.remove();
       } else {
        throw new Error('id inexistente');
       }
    }
}
