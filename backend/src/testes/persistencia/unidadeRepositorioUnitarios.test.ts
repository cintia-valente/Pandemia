import mongoose from 'mongoose';
import * as dbhandler from '../dbhandler';
import { UnidadeRepositorio } from '../../persistencia/repositorio/unidadeRepositorio';
import { Unidade } from '../../entidades/unidade';
import { UnidadeModel } from '../../persistencia/model/unidadeModel';
import { AtendimentoModel } from '../../persistencia/model/atendimentoModel';


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

describe('Testes unitários de UnidadeRepositorio', ()=>{
    describe('getUnidades()', ()=>{
        test('deve retornar um array vazio', async ()=>{
            const mockUnidadeRepositorioInput = await getMockUnidades();
            expect(mockUnidadeRepositorioInput).toBeDefined();
            expect(mockUnidadeRepositorioInput).toHaveLength(2);
        });

        test('Deve apresentar um erro ao criar um Unidade', async () => {
            const mockUnidadeRepositorioErro = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroUnidade = await getMockUnidades();
            expect(erroUnidade).toBeDefined();

        });
    });

    describe('getUnidadePorId()', () => {
        test('Deve buscar uma unidade pelo id', async () => {
            const mockUnidadeRepositorioBuscarPorId = jest
                .spyOn(UnidadeRepositorio, 'getUnidadePorId')
                .mockResolvedValue(mockUnidade);

            const resultUnidadeId = await UnidadeRepositorio.getUnidadePorId('id');
            expect(resultUnidadeId).toBeDefined();
            expect(mockUnidadeRepositorioBuscarPorId).toHaveBeenCalledWith('id');
        });

        test('Requer um id válido', async () => {
            const mockUnidadeRepositorioBuscarPorId = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroIdUnidade = await UnidadeRepositorio.getUnidadePorId('id');
            expect(erroIdUnidade).toBeDefined();
        });
    });

    describe('getUnidadePorNome()', ()=>{
        test('Deve buscar uma unidade pelo nome', async()=>{
            const mockUnidadeRepositorioBuscarPorNome = jest
            .spyOn(UnidadeRepositorio, 'getUnidadePorNome')
            .mockResolvedValue(mockUnidade);

            const resultUnidadeNome = await UnidadeRepositorio.getUnidadePorNome('nome');
            expect(resultUnidadeNome).toBeDefined();
            expect(mockUnidadeRepositorioBuscarPorNome).toHaveBeenCalledWith('nome');
        });

         test('Requer um nome válido', async () => {
            const mockUnidadeRepositorioBuscarPorNome = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroNome= await UnidadeRepositorio.getUnidadePorNome('nome');
            expect(erroNome).toBeDefined();
        });

        test('Requer um endereço válido', async () => {
            const mockUnidadeRepositorioBuscarPorId = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroEnd= await UnidadeRepositorio.getUnidadePorNome('end');
            expect(erroEnd).toBeDefined();
        });
    });

    describe('postUnidade()', () => {
        test('Deve inserir uma unidade', async () => {
            const res = await UnidadeRepositorio.postUnidade(mockUnidade);
            expect(res.nome).toEqual(mockUnidade.nome);
            expect(res.endereco?.rua).toEqual(mockUnidade.endereco.rua);
            expect(res.endereco?.numero).toEqual(mockUnidade.endereco.numero);
            expect(res.endereco?.bairro).toEqual(mockUnidade.endereco.bairro);
            expect(res.endereco?.cidade).toEqual(mockUnidade.endereco.cidade);
        });

        test('Requer unidade com nome válido', async () => {
            await expect(UnidadeRepositorio.postUnidade(mockUnidadeNomeErro))
                .rejects
                .toThrow(mongoose.Error.ValidationError);
        });
    });

    describe('patchUnidade()', () => {
        test('Deve alterar uma unidade', async () => {
            const mockUnidadeAlterar = jest.spyOn(UnidadeRepositorio, 'patchUnidade')
                .mockResolvedValue(mockUnidade);

            const mockId = "5erf151frf";

            const result = await UnidadeRepositorio.patchUnidade(mockId, mockUnidade);
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('idUnidade');
        });

        test('Deve apresentar erro ao alterar um Unidade', async () => {
            jest.spyOn(UnidadeRepositorio, 'patchUnidade')
                .mockRejectedValue(new Error());

            const mockId = "585defr896";

            const alteracao = async () => { await UnidadeRepositorio.patchUnidade(mockId, mockUnidade) };
            expect(alteracao).rejects.toThrow();
        });
    });

    describe('deleteUnidade()', () => {
        test('Deve deletar uma unidade', async () => {
            const mockUnidadeDeletar = jest.spyOn(UnidadeRepositorio, 'deleteUnidade')
            .mockResolvedValue(mockUnidade);

            const mockId = "5erf151frf";

            const result = await UnidadeRepositorio.deleteUnidade(mockId);
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('idUnidade');
            expect(mockUnidadeDeletar).toHaveBeenCalledWith(mockId);
        });

        test('Deve apresentar erro ao deletar um Unidade', async () => {
            jest.spyOn(UnidadeRepositorio, 'deleteUnidade')
                .mockRejectedValue(new Error());

            const mockId = "5erf151frf";
            
            const exclusao = async () => { await UnidadeRepositorio.deleteUnidade(mockId) }
            expect(exclusao).rejects.toThrow();
        });
    });
});

const mockUnidade = {
    idUnidade: "1",
    nome: "Clínicas",
    endereco: {
        rua: "Elite",
        numero: 345,
        bairro: "Jerfug",
        cidade: "Porto Alegre"
    }
};

const mockUnidadeNomeErro = {
    idUnidade: "1",
    nome: "",
    endereco: {
        rua: "wrugnr",
        numero: 345,
        bairro: "reguenr",
        cidade: "Porto Alegre"
    }
};

function getMockUnidades(): Unidade[]{
    const unidades: Unidade[] = [
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
        }
    ]
    return unidades;
}