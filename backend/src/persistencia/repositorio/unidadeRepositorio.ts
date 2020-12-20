import { UnidadeModel } from '../model/unidadeModel';
import { Unidade } from '../../entidades/unidade';
import { ConnectionStates } from "mongoose";
import { PacienteModel } from '../model/pacienteModel';

export class UnidadeRepositorio {

    static async getUnidades(): Promise<Unidade[]>{
        return UnidadeModel.find().exec();
    }

    static async getUnidadePorId(id: string): Promise<Unidade | any>{
        let unidade = await UnidadeModel.findById(id).exec();
        if( unidade != null){
           return unidade;
        } else{
            throw new Error('Id inexistente');
        }
    }

    static async getUnidadePorNome(nome: string): Promise<Unidade[] | any>{
        let unidade = await UnidadeModel.find().where("nome").equals(nome).exec();
        if(unidade != null){
            return unidade;
        } else {
            throw new Error('Nome inexistente');
        }
    }

    static async postUnidade(Unidade: Unidade): Promise<Unidade>{
        return UnidadeModel.create(Unidade);
    }
    
    static async patchUnidade(id: string , unidade: Unidade): Promise<Unidade>{
        let atualiza = await UnidadeModel.findById(id).exec();
        if(atualiza != null){
            atualiza.nome = unidade.nome;
            atualiza.endereco = unidade.endereco;
            return atualiza.save();
        } else {
            throw new Error('Id inexistente');
        }
    }

    static async deleteUnidade (id: string): Promise<Unidade>{
       let exclui = await UnidadeModel.findById(id).exec();
       if(exclui != null){
           return exclui.remove();
       } else {
        throw new Error('Id inexistente');
       }
    }
}
