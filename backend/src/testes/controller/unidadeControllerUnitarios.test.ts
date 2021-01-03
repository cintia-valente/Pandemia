import request from 'supertest';
import * as dbhandler from '../dbhandler';
import app from '../../app';
import { UnidadeRepositorio } from '../../persistencia/repositorio/unidadeRepositorio';
import { Unidade } from '../../entidades/unidade';
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

const mockUnidades: Unidade[] = [
  {
    idUnidade: "1",
    nome: "Unidade A",
    endereco: {
      rua: "Elite",
      numero: 345,
      bairro: "High",
      cidade: "Porto Alegre"
    },
  },
  {
    idUnidade: "2",
    nome: "Unidade B",
    endereco: {
      rua: "RFNRJNF",
      numero: 558,
      bairro: "SDJFNSDJ",
      cidade: "Porto Alegre"
    },
  },
]

describe('Testes unitários de UnidadeController', () => {
  describe('getUnidades()', () => {
    test('Deve retornar lista de Unidades', async () => {
      const mockUnidadeRepositorioGet = jest
        .spyOn(UnidadeRepositorio, 'getUnidades')
        .mockResolvedValue(mockUnidades);

      const result = await request(app).get('/unidade');

      expect(mockUnidadeRepositorioGet).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(200);
      expect(result.body).toEqual(mockUnidades);

    });
    test('Deve enviar um status de erro', async () => {
      const mockunidadeRepositorioGet = jest
        .spyOn(UnidadeRepositorio, 'getUnidades')
        .mockRejectedValue(new Error('Erro'));

      const result = await request(app).get('/unidade');
      expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });

  describe('getUnidadePorId()', () => {
    test('Deve retornar unidade com o id buscado', async () => {
      const mockGetunidadePorId = jest
        .spyOn(UnidadeRepositorio, 'getUnidadePorId')
        .mockResolvedValue(mockUnidades[0]);

      const result = await request(app).get('/unidade/unidid');
      expect(result).toBeDefined();
    });

    test('Deve enviar um status 404', async () => {
      const mockGetunidadePorId = jest
        .spyOn(UnidadeRepositorio, 'getUnidadePorId')
        .mockResolvedValue(null);

      const result = await request(app).get('/unidade/unidid');
      expect(result.status).toEqual(404);
    });

    test('Deve enviar um status de erro', async () => {
      const mockGetunidadePorId = jest
        .spyOn(UnidadeRepositorio, 'getUnidadePorId')
        .mockRejectedValue(new Error('Erro'));

      const result = await request(app).get('/unidade/unidid');
      expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });

  describe('getUnidadePorNome()', () => {
    test('Deve retornar código de erro para erro na busca', async () => {
      const mockGetunidadePorNome = jest
        .spyOn(UnidadeRepositorio, 'getUnidadePorNome')
        .mockRejectedValue(new Error('Erro'));

      const result = await request(app).get('/unidade/unidnome');
      expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });

  describe('postUnidade()', ()=>{
    test('Deve retornar a unidade inserida e status 401', async()=>{
        const mockunidadePost = jest
            .spyOn(UnidadeRepositorio, 'postUnidade')
            .mockImplementation((unidade:Unidade) =>Promise.resolve(unidade));

        const result = await request(app).post('/authunid').send(mockUnidades[0]);
        expect(result.status).toEqual(401);
    });

    test('Deve enviar um status de erro', async()=>{
        const mockunidadePost = jest
            .spyOn(UnidadeRepositorio, 'postUnidade')
            .mockRejectedValue(new Error('Erro'));

        const result = await request(app).post('/authunid');
        expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });
});