import { connect } from 'mongoose';
import { PacienteRepositorio } from './persistencia/repositorio/pacienteRepositorio';
import { AtendimentoRepositorio } from './persistencia/repositorio/atendimentoRepositorio';
import { UnidadeRepositorio } from './persistencia/repositorio/unidadeRepositorio';
import app from './app';
import { Console } from 'console';

async function main() {
    const url = 'mongodb://localhost:27017/pandemia';

    try {
        const cliente = await connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado');
        /*
         const paciente1 = await PacienteRepositorio.postPaciente({
             nome: "Lia",
             cpf: "8446515",
             idade: 32,
             telefone: "348755151",
             email: "li@email.com",
             sexo: "F",
             peso: 70,
             altura: 1.75,
             endereco: {
                 rua: "XXX",
                 numero: 84514,
                 bairro: "DBFSBSJ",
                 cidade: "Porto Alegre"
             }
         });

         console.log('Inserido:');
         console.log(paciente1);

         const paciente2 = await PacienteRepositorio.postPaciente({
             nome: "Joe Tribiane",
             cpf: "04875632542",
             idade: 30,
             telefone: "957853242",
             email: "joe@tribi.com",
             sexo: "M",
             peso: 85,
             altura: 1.85,
             endereco: {
               rua: "Nova Yorque",
               numero: 58,
               bairro: "Moinhos de Vento",
               cidade: "Porto Alegre"     
             }
         });
 
         const paciente3 = await PacienteRepositorio.postPaciente({
             nome: "Ross Geller",
             cpf: "57849215064",
             idade: 31,
             telefone: "34857621",
             email: "ross@email.com",
             sexo: "M",
             peso: 90,
             altura: 1.85,
             endereco: {
                 rua: "EUA",
                 numero: 505,
                 bairro: "Mont Serrat",
                 cidade: "Porto Alegre"
             }
         });
 
         console.log('Inserido:');
         console.log(paciente1);
         console.log(paciente2);
         console.log(paciente3);
         
         const pacienteAtualizado = await PacienteRepositorio.patchPaciente("5fe209ae6bafbf32d8eef946", 
         {
             nome: "Monica Geller",
             cpf: "84967510",
             idade: 29,
             telefone: "34867518",
             email: "mon@green.com",
             sexo: "F",
             peso: 55,
             altura: 1.65,
             endereco: {
                 rua: "Friends",
                 numero: 93,
                 bairro: "Bela Vista",
                 cidade: "Porto Alegre"
             }
         });
 
         console.log(pacienteAtualizado);
 
         console.log('Paciente deletado:');
         const pacienteDeletado = await PacienteRepositorio.deletePaciente("5fe204f5b221a32eaca4dbaa");
         console.log(pacientedeletado);
         

        const atendimento1 = await AtendimentoRepositorio.postAtendimento({
            possibContagio: true,
            teste1: true,
            teste2: true,
            tempo: 45,
            paciente: {
                idPaciente: 4,
                nome: "Ross Geller",
                cpf: "57849215064",
                idade: 31,
                telefone: "34857621",
                email: "ross@email.com",
                sexo: "M",
                peso: 90,
                altura: 1.85,
                endereco: {
                    rua: "EUA",
                    numero: 505,
                    bairro: "Mont Serrat",
                    cidade: "Porto Alegre"
                }
            }
        });

        console.log('Inserido:');
        console.log(atendimento1);
/*
        console.log('Atendimentos:')
        const listaAtendimentos = await AtendimentoRepositorio.getAtendimentos();
        console.log(listaAtendimentos);
        */

        //conecta o servidor express:
        const server = app.listen(app.get('port'), () => {
            console.log(`Express na porta ${app.get('port')}`);

        });
    } catch (erro) {
        console.log(`Erro: ${erro}`);
    }
}
main();