import mongoose from 'mongoose';
import * as dbhandler from '../dbhandler';
import { AtendimentoRepositorio } from '../../persistencia/repositorio/atendimentoRepositorio';
import { Atendimento } from '../../entidades/atendimento';
import { AtendimentoModel } from '../../persistencia/model/atendimentoModel';
import { PacienteModel } from '../../persistencia/model/pacienteModel';
import { Unidade } from '../../entidades/unidade';

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

describe('Testes unitários de atendimentoRepositorio', () => {
    describe('getAtendimentos()', () => {
        test('deve retornar um array vazio', async () => {
            const mockAtendimentoRepositorioInput = await getmockAtendimentos();
            expect(mockAtendimentoRepositorioInput).toBeDefined();
            expect(mockAtendimentoRepositorioInput).toHaveLength(2);
        });

        test('Deve apresentar um erro ao criar um atendimento', async () => {
            const mockAtendimentoRepositorioErro = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroAtendimento = await getmockAtendimentos();
            expect(erroAtendimento).toBeDefined();

        });
    });

    describe('getAtendimentoPorId()', () => {
        test('Deve buscar um atendimento pelo id', async () => {
            const mockAtendimentoRepositorioBuscarPorId = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentoPorId')
                .mockResolvedValue(mockAtendimento);

            const resultAtendimentoId = await AtendimentoRepositorio.getAtendimentoPorId('idAtendimento');
            expect(resultAtendimentoId).toBeDefined();
        });

        test('Requer um id válido', async () => {
            const mockAtendimentoRepositorioBuscarPorId = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroIdAtendimento = await AtendimentoRepositorio.getAtendimentoPorId('idAtendimento');
            expect(erroIdAtendimento).toBeDefined();
        });
    });

    describe('getAtendimentoUnidadePorId()', () => {
        test('Deve buscar um atendimento pelo id', async () => {
            const mockAtendimentoRepositorioBuscarUnidadePorId = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentoPorId')
                .mockResolvedValue(mockAtendimento);

            const resultatendimentoUnidadeId = await AtendimentoRepositorio.getAtendimentoUnidadePorId('idUnidade');
            expect(resultatendimentoUnidadeId).toBeDefined();
            //expect(mockAtendimentoRepositorioBuscarUnidadePorId).toHaveBeenCalledWith('idUnidade');
        });

        test('Requer um id válido', async () => {
            const mockAtendimentoRepositorioBuscarUnidadePorId = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroIdAtendimentoUnidade = await AtendimentoRepositorio.getAtendimentoUnidadePorId('idUnidade');
            expect(erroIdAtendimentoUnidade).toBeDefined();
        });
    });

    /*describe('postAtendimento()', () => {
        test('Deve inserir um atendimento', async () => {
            const res = await AtendimentoRepositorio.postAtendimento(mockAtendimento);
            //expect(res.idAtendimento).toEqual(mockAtendimento.idAtendimento);
            expect(res.idUnidade).toEqual(mockAtendimento.idUnidade);
            expect(res.paciente).toEqual(mockAtendimento.paciente);
            expect(res.possibContagio).toEqual(mockAtendimento.possibContagio);
            expect(res.teste1).toEqual(mockAtendimento.teste1);
            expect(res.teste2).toEqual(mockAtendimento.teste2);
            expect(res.tempo).toEqual(mockAtendimento.tempo);
        });
    });*/

    describe('patchAtendimento()', () => {
        test('Deve alterar uma atendimento', async () => {
            const mockAtendimentoAlterar = jest.spyOn(AtendimentoRepositorio, 'patchAtendimento')
                .mockResolvedValue(mockAtendimento);

            const mockId = "5erf151frf";

            const result = await AtendimentoRepositorio.patchAtendimento(mockId, mockAtendimento);
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('idAtendimento');
        });

        test('Deve apresentar erro ao alterar um atendimento', async () => {
            jest.spyOn(AtendimentoRepositorio, 'patchAtendimento')
                .mockRejectedValue(new Error());

            const mockId = "585defr896";

            const alteracao = async () => { await AtendimentoRepositorio.patchAtendimento(mockId, mockAtendimento) };
            expect(alteracao).rejects.toThrow();
        });
    });

    describe('deleteAtendimento()', () => {
        test('Deve deletar uma atendimento', async () => {
            const mockAtendimentoDeletar = jest.spyOn(AtendimentoRepositorio, 'deleteAtendimento')
                .mockResolvedValue(mockAtendimento);

            const mockId = "5erf151frf";

            const result = await AtendimentoRepositorio.deleteAtendimento(mockId);
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('idAtendimento');
            expect(mockAtendimentoDeletar).toHaveBeenCalledWith(mockId);
        });

        test('Deve apresentar erro ao deletar um atendimento', async () => {
            jest.spyOn(AtendimentoRepositorio, 'deleteAtendimento')
                .mockRejectedValue(new Error());

            const mockId = "5erf151frf";

            const exclusao = async () => { await AtendimentoRepositorio.deleteAtendimento(mockId) }
            expect(exclusao).rejects.toThrow();
        });
    });
});

const mockAtendimento = {
    idAtendimento: "1",
    idUnidade: "10",
    paciente: "1",
    possibContagio: true,
    teste1: true,
    teste2: false,
    tempo: 29
};

async function getmockAtendimentos() {
    const p1 = await PacienteModel.create({
        id: "1",
        nome: "Mia Colluci",
        cpf: "111.254.355-87",
        idade: 17,
        telefone: "95784264",
        email: "barbie@colluci.com",
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

    const p2 = await PacienteModel.create({
        id: "2",
        nome: "Diego Bustamante",
        cpf: "586.485.475-21",
        idade: 16,
        telefone: "948665721",
        email: "di@bustamante.com",
        sexo: "M",
        peso: 70,
        altura: 1.70,
        endereco: {
            rua: "XY",
            numero: 482,
            bairro: "High",
            cidade: "Mexico"
        },
    });

    const atendimentos: Atendimento[] = [
        {
            //idAtendimento: "1",
            idUnidade: "10",
            paciente: p1,
            possibContagio: true,
            teste1: true,
            teste2: false,
            tempo: 29
        },
        {
            //idAtendimento: "2",
            idUnidade: "12",
            paciente: p2,
            possibContagio: true,
            teste1: true,
            teste2: true,
            tempo: 30
        }
    ]
    return atendimentos;
}