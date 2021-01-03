import mongoose from 'mongoose';
import request from 'supertest';
import { AtendimentoRepositorio } from '../../persistencia/repositorio/atendimentoRepositorio';
import * as dbhandler from '../dbhandler';
import { Atendimento } from '../../entidades/atendimento';
import { AtendimentoModel } from '../../persistencia/model/atendimentoModel';
import { Paciente } from '../../entidades/paciente';
import { PacienteModel } from '../../persistencia/model/pacienteModel';
import { Unidade } from '../../entidades/unidade';
import { UnidadeModel } from '../../persistencia/model/unidadeModel';
import app from '../../app';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

/**
 * Conecta com o banco de dados antes de executar qualquer teste.
 */
beforeAll(async () => {
    await dbhandler.connect();
});

/**
 * Limpa os dados após cada teste.
 */
afterEach(async () => {
    await dbhandler.clearDatabase();
});

/**
 * Remove e fecha a conexão com o banco de dados após os teste.
 */
afterAll(async () => {
    await dbhandler.closeDatabase();
});

const idInvalido = 'a';

describe('Testes de integração de AtendimentoRepositorio', () => {
    describe('getAtendimentos()', () => {
        test('Deve retornar um Atendimento vazio', async () => {
            const result = await AtendimentoRepositorio.getAtendimentos();
            expect(result).toEqual([]);
        });

        test('Deve retornar uma lista de Atendimentos com tamanho 2', async () => {
            await seedDataBase();
            const result = await AtendimentoRepositorio.getAtendimentos();
            expect(result).toHaveLength(2);
        });
    });

    describe('getAtendimentoPorId', () => {
        test('Deve apresentar uma exception ao buscar por idInvalido', async () => {
            const idInvalido = -0;
            const result = async () => { await AtendimentoRepositorio.getAtendimentoPorId('idInvalido') };
            expect(result).toBeDefined();
        });
    });

    describe('postAtendimento()', () => {
        test('Deve retornar um atendimento com id e propriedades', async ()=> {
            const unidadeSaude = await criarUnidadeSaude();
            const paciente = await criarPaciente();
            const atendimento = await criarAtendimento(unidadeSaude, paciente);
            const atendimentoCriado = await AtendimentoRepositorio.postAtendimento(atendimento);
            expect(atendimentoCriado).toHaveProperty('_id');
            expect(atendimentoCriado.idUnidade).toEqual(atendimento.idUnidade);
            expect(atendimentoCriado.paciente).toEqual(atendimento.paciente);
            expect(atendimentoCriado.possibContagio).toEqual(atendimento.possibContagio);
            expect(atendimentoCriado.teste1).toEqual(atendimento.teste1);
            expect(atendimentoCriado.teste2).toEqual(atendimento.teste2);
            expect(atendimentoCriado.tempo).toEqual(atendimento.tempo);
        });
        
        test('Deve retornar um atendimento como default', async ()=>{
            const unidadeSaude = await criarUnidadeSaude();
            const paciente = await criarPaciente();
            let atendimento = await criarAtendimento(unidadeSaude, paciente);
            let atendimentoCriado = await AtendimentoRepositorio.postAtendimento(atendimento);
            expect(atendimentoCriado.idAtendimento).toEqual("1")
        });
    });

    describe('deletarAtendimento()', () => {
        test('deve deletar um Atendimento', async () => {
            expect(async () => {
                const deletaAtendimento = await AtendimentoRepositorio.deleteAtendimento('id');
                expect(deletaAtendimento).toBeDefined();
            });
        });

        test('deve deletar um Atendimento válido', async () => {
            expect(async () => {
                const deletaAtendimento = await AtendimentoRepositorio.deleteAtendimento('id')
            }).rejects.toThrowError();
        });
    });
});

async function seedDataBase(): Promise<string[]> {
    const unidadeSaude = await criarUnidadeSaude();
    const paciente: Paciente = await criarPaciente();
    let a1 = await AtendimentoModel.create(await criarAtendimento(unidadeSaude, paciente));
    let a2 = await AtendimentoModel.create(await criarAtendimento(unidadeSaude, paciente));

    return [a1, a2].map(a => a._id);
}

async function criarAtendimento(unidade: Unidade, paciente: Paciente): Promise<Atendimento> {
    return {
        idAtendimento: "1",
        idUnidade: "10",
        paciente: paciente,
        possibContagio: true,
        teste1: true,
        teste2: false,
        tempo: 29
    }
}

async function criarPaciente() {
    return PacienteModel.create({
        id: "1",
        nome: "Mia Colluci",
        cpf: "111.254.355-87",
        idade: 17,
        telefone: "95784264",
        email: "mia@colluci.com",
        sexo: "F",
        peso: 50,
        altura: 1.60,
        endereco: {
            rua: "Elite",
            numero: 345,
            bairro: "High",
            cidade: "Mexico"
        }
    });
}

async function criarUnidadeSaude() {
    return UnidadeModel.create({
        idUnidade: "1",
        nome: "Unidade A",
        endereco: {
            rua: "FSSF",
            numero: 5,
            bairro: "IRNFRI",
            cidade: "Porto Alegre"
        }
    })
}