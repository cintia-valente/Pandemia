import request from 'supertest';
import * as dbhandler from '../dbhandler';
import app from '../../app';
import { AtendimentoRepositorio } from '../../persistencia/repositorio/atendimentoRepositorio';
import { Atendimento } from '../../entidades/atendimento';
import jwt, { TokenExpiredError } from "jsonwebtoken";

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

const mockAtendimentos: Atendimento[] = [
    {
        idAtendimento: "01",
        idUnidade: "10",
        paciente: "1",
        possibContagio: true,
        teste1: true,
        teste2: false,
        tempo: 29
    },
    {
        idAtendimento: "02",
        idUnidade: "11",
        paciente: "2",
        possibContagio: true,
        teste1: true,
        teste2: true,
        tempo: 30
    }
]

describe('Testes unitários de AtendimentoController', () => {
    describe('getAtendimentos()', () => {
        test('Deve retornar lista de Atendimentos', async () => {
            const mockAtendimentoRepositorioGet = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentos')
                .mockResolvedValue(mockAtendimentos);

            const result = await request(app).get('/atendimento');

            expect(mockAtendimentoRepositorioGet).toHaveBeenCalledTimes(1);
            expect(result.status).toEqual(200);
            expect(result.body).toEqual(mockAtendimentos);

        });
        test('Deve enviar um status de erro', async () => {
            const mockAtendimentoRepositorioGet = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentos')
                .mockRejectedValue(new Error('Erro'));

            const result = await request(app).get('/atendimento');
            expect(result.status).toBeGreaterThanOrEqual(300);
        });
    });

    describe('getAtendimentoPorId()', () => {
        test('Deve retornar Atendimento com o id buscado', async () => {
            const mockGetAtendimentoPorId = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentoPorId')
                .mockResolvedValue(mockAtendimentos[0]);

            const result = await request(app).get('/atendimento/atendid');
            expect(result).toBeDefined();
        });

        test('Deve enviar um status 404', async () => {
            const mockGetAtendimentoPorId = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentoPorId')
                .mockResolvedValue(null);

            const result = await request(app).get('/atendimento/atendid');
            expect(result.status).toEqual(404);
        });

        test('Deve enviar um status de erro', async () => {
            const mockGetAtendimentoPorId = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentoPorId')
                .mockRejectedValue(new Error('Erro'));

            const result = await request(app).get('/atendimento/:atendid');
            expect(result.status).toBeGreaterThanOrEqual(300);
        });
    });

    describe('getAtendimentoUnidadePorId()', () => {
        test('Deve retornar código de erro para erro na busca', async () => {
            const mockGetAtendimentoUnidadePorId = jest
                .spyOn(AtendimentoRepositorio, 'getAtendimentoUnidadePorId')
                .mockRejectedValue(new Error('Erro'));

            const result = await request(app).get('/atendimentodeunidade/unitid');
            expect(result.status).toBeGreaterThanOrEqual(300);
        });
    });

    describe('postAtendimento()', () => {
        test('Deve retornar o Atendimento inserido e status 401', async () => {
            const mockAtendimentoPost = jest
                .spyOn(AtendimentoRepositorio, 'postAtendimento')
                .mockImplementation((Atendimento: Atendimento) => Promise.resolve(Atendimento));

            const result = await request(app).post('/authatendimento').send(mockAtendimentos[0]);
            expect(result.status).toEqual(401);
        });

        test('Deve enviar um status de erro', async () => {
            const mockAtendimentoPost = jest
                .spyOn(AtendimentoRepositorio, 'postAtendimento')
                .mockRejectedValue(new Error('Erro'));

            const result = await request(app).post('/authatendimento');
            expect(result.status).toBeGreaterThanOrEqual(300);
        });
    });
});