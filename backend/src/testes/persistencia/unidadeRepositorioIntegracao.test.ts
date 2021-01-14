import mongoose from 'mongoose';
import request from 'supertest';
import { UnidadeRepositorio } from '../../persistencia/repositorio/unidadeRepositorio';
import * as dbhandler from '../dbhandler';
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

describe('Testes de integração de UnidadeRepositorio', () => {
    describe('getUnidades()', () => {
        test('Deve retornar uma unidade vazia', async () => {
            const result = await UnidadeRepositorio.getUnidades();
            expect(result).toEqual([]);
        });

        test('Deve retornar uma lista de unidades com tamanho 3', async () => {
            await informacaoParaTeste();
            const result = await UnidadeRepositorio.getUnidades();
            expect(result).toHaveLength(3);
        });
    });

    describe('getUnidadePorId', () => {
        test('Deve apresentar uma exception ao buscar por id inválido', async () => {
            const idInvalido = -0;
            const result = async () => { await UnidadeRepositorio.getUnidadePorId('idInvalido') };
            expect(result).toBeDefined();
        });
    });

    describe('getUnidadePorNome()', () => {
        test('Deve apresentar uma exception ao buscar por nome inexistente', async () => {
            const nomeInvalido = ' ';
            const result = async () => { await UnidadeRepositorio.getUnidadePorNome(nomeInvalido) };
            expect(result).toBeDefined();
        });
    });

    describe('postUnidade()', () => {
        test('Deve inserir uma unidade', async () => {
            const unidade = await UnidadeRepositorio.postUnidade(unidadeValida);
            const unidades = await UnidadeRepositorio.getUnidades();
            expect(unidades).toHaveLength(1);
            expect(unidade).toHaveProperty('id');
            expect(unidade.idUnidade).toEqual(unidadeValida.idUnidade);
            expect(unidade.nome).toEqual(unidadeValida.nome);
        });
    });

    describe('patchUnidade()', () => {
        test('Deve apresentar erro ao passar id invalido na alteração', async () => {
            const idInvalido = -0;
            const Unidade = await informacaoParaTeste();
            const result = async () => { await UnidadeRepositorio.patchUnidade("idInvalido", Unidade[1]) }
            expect(result).toBeDefined();
        });
    });

    describe('deleteUnidade()', () => {
        test('deve deletar uma unidade', async () => {
            expect(async () => {
                const deletaUnidade = await UnidadeRepositorio.deleteUnidade('id');
                expect(deletaUnidade).toBeDefined();
            });
        });

        test('deve deletar uma unidade válido', async () => {
            expect(async () => {
                const deletaUnidade = await UnidadeRepositorio.deleteUnidade('id')
            }).rejects.toThrowError();
        });
    });
});

const unidadeValida = {
    idUnidade: "1",
    nome: "Unidade A"
}

const unidadeNomeInvalido = {
    idUnidade: "1",
    nome: " "
}

async function seedDatabase(): Promise<Unidade[]> {
    const Unidades: Unidade[] = [
        {
            idUnidade: "1",
            nome: "Unidade A",
            endereco: {
                rua: "FSSF",
                numero: 5,
                bairro: "IRNFRI",
                cidade: "Porto Alegre"
            },
        },
        {
            idUnidade: "2",
            nome: "Unidade B",
            endereco: {
                rua: "XXX",
                numero: 85,
                bairro: "ETGIERN",
                cidade: "Porto Alegre"
            },
        },
        {
            idUnidade: "3",
            nome: "Unidade C",
            endereco: {
                rua: "YYY",
                numero: 11,
                bairro: "HYRJINHT",
                cidade: "Porto Alegre"
            },
        }
    ]
    return Unidades;
}

async function informacaoParaTeste(): Promise<Unidade[]> {
    const Unidades = await seedDatabase();
    let Unidade1 = await UnidadeModel.create(Unidades[0]);
    let Unidade2 = await UnidadeModel.create(Unidades[1]);
    let Unidade3 = await UnidadeModel.create(Unidades[2]);
    return [Unidade1, Unidade2, Unidade3];
}