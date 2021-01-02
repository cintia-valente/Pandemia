import request from 'supertest';
import * as dbhandler from '../dbhandler';
import app from '../../app';
import { PacienteRepositorio } from '../../persistencia/repositorio/pacienteRepositorio';
import { Paciente } from '../../entidades/paciente';
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

const mockPacientes: Paciente[] = [
  {
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
    },
  },
  {
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
  }
]

describe('Testes unitários de PacienteController', () => {
  describe('getPacientes()', () => {
    test('Deve retornar lista de pacientes', async () => {
      const mockPacienteRepositorioGet = jest
        .spyOn(PacienteRepositorio, 'getPacientes')
        .mockResolvedValue(mockPacientes);

      const result = await request(app).get('/paciente');

      expect(mockPacienteRepositorioGet).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(200);
      expect(result.body).toEqual(mockPacientes);

    });
    test('Deve enviar um status de erro', async () => {
      const mockPacienteRepositorioGet = jest
        .spyOn(PacienteRepositorio, 'getPacientes')
        .mockRejectedValue(new Error('Erro'));

      const result = await request(app).get('/paciente');
      expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });

  describe('getPacientePorId()', () => {
    test('Deve retornar paciente com o id buscado', async () => {
      const mockGetPacientePorId = jest
        .spyOn(PacienteRepositorio, 'getPacientePorId')
        .mockResolvedValue(mockPacientes[0]);

      const result = await request(app).get('/paciente/pacienteid');
      expect(result).toBeDefined();
    });

    test('Deve enviar um status 404', async () => {
      const mockGetPacientePorId = jest
        .spyOn(PacienteRepositorio, 'getPacientePorId')
        .mockResolvedValue(null);

      const result = await request(app).get('/paciente/pacienteid');
      expect(result.status).toEqual(404);
    });

    test('Deve enviar um status de erro', async () => {
      const mockGetPacientePorId = jest
        .spyOn(PacienteRepositorio, 'getPacientePorId')
        .mockRejectedValue(new Error('Erro'));

      const result = await request(app).get('/paciente/pacienteid');
      expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });

  describe('getPacientePorCpf()', () => {
    test('Deve retornar um paciente', async () => {
      const mockGetPacientePorCpf = jest
        .spyOn(PacienteRepositorio, 'getPacientePorCpf')
        .mockResolvedValue(mockPacientes[0]);

      const result = await request(app).get('/pacientecpf/cpf');
      expect(mockGetPacientePorCpf).toHaveBeenCalledTimes(1);
      expect(mockGetPacientePorCpf).toHaveBeenCalledWith('cpf');
      expect(result.status).toEqual(200);
      expect(result.body).toEqual(mockPacientes[0]);
    });

    test('Deve retornar vazio para cpf inexistente', async () => {
      const mockGetPacientePorCpf = jest
        .spyOn(PacienteRepositorio, 'getPacientePorCpf')
        .mockResolvedValue(null);

      const result = await request(app).get('/pacientecpf/cpf');
      expect(result.status).toEqual(404);
    });

    test('Deve retornar código de erro para erro na busca', async () => {
      const mockGetPacientePorCpf = jest
        .spyOn(PacienteRepositorio, 'getPacientePorCpf')
        .mockRejectedValue(new Error('Erro'));

      const result = await request(app).get('/pacientecpf/cpf');
      expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });

  describe('postPaciente()', ()=>{
    test('Deve retornar o paciente inserido e status 401', async()=>{
        const mockPacientePost = jest
            .spyOn(PacienteRepositorio, 'postPaciente')
            .mockImplementation((paciente:Paciente) =>Promise.resolve(paciente));

        const result = await request(app).post('/authpaciente').send(mockPacientes[0]);
        expect(result.status).toEqual(401);
    });

    test('Deve enviar um status de erro', async()=>{
        const mockPacientePost = jest
            .spyOn(PacienteRepositorio, 'postPaciente')
            .mockRejectedValue(new Error('Erro'));

        const result = await request(app).post('/authpaciente');
        expect(result.status).toBeGreaterThanOrEqual(300);
    });
  });
});