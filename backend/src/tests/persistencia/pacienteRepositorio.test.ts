import mongoose from 'mongoose';
import request from 'supertest';
import { PacienteRepositorio } from '../../persistencia/repositorio/pacienteRepositorio';
import * as dbhandler from '../dbhandler';
import { Paciente } from '../../entidades/paciente';
import { PacienteModel } from '../../persistencia/model/pacienteModel';
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

describe('PacienteRepositorio', () => {
    const mockPaciente = {
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
    };

    const mockPacienteNomeErro = {
        nome: "",
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
    };

    const mockPacienteCPFErro = {
        nome: "Mia Colluci",
        cpf: "111152565-87",
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
    };

    describe('postPaciente()', () => {
        test('Deve inserir um paciente', async () => {
            const res = await PacienteRepositorio.postPaciente(mockPaciente);
            expect(res.nome).toEqual(mockPaciente.nome);
            expect(res.cpf).toEqual(mockPaciente.cpf);
            expect(res.idade).toEqual(mockPaciente.idade);
            expect(res.telefone).toEqual(mockPaciente.telefone);
            expect(res.email).toEqual(mockPaciente.email);
            expect(res.sexo).toEqual(mockPaciente.sexo);
            expect(res.peso).toEqual(mockPaciente.peso);
            expect(res.altura).toEqual(mockPaciente.altura);
            expect(res.endereco?.rua).toEqual(mockPaciente.endereco.rua);
            expect(res.endereco?.numero).toEqual(mockPaciente.endereco.numero);
            expect(res.endereco?.bairro).toEqual(mockPaciente.endereco.bairro);
            expect(res.endereco?.cidade).toEqual(mockPaciente.endereco.cidade);
        });

        test('Requer paciente com nome válido', async () => {
            await expect(PacienteRepositorio.postPaciente(mockPacienteNomeErro))
                .rejects
                .toThrow(mongoose.Error.ValidationError);
        });

        test('Requer paciente com cpf válido', async () => {
            await expect(PacienteRepositorio.postPaciente(mockPacienteCPFErro))
                .rejects
                .toThrow(mongoose.Error.ValidationError);
        });
    });

/*
    describe('buscar()', () => {
        test('deve retornar um paciente vazio', async () => {
            const resultPaciente = await PacienteRepositorio.buscar();
            expect(resultPaciente).toBeDefined();
            expect(resultPaciente).toHaveLength(0);
        });

        test('deve retornar todos os pacientes', async () => {
            await seedDatabase();
            const resultPacientes = await PacienteRepositorio.buscar();
            expect(resultPacientes).toBeDefined();
            expect(resultPacientes).toHaveLength(4);
            expect(resultPacientes[0].nome).toEqual('Yasmim');
            expect(resultPacientes[1].nome).toEqual('Leon');
            expect(resultPacientes[2].nome).toEqual('Jeniffer');
            expect(resultPacientes[3].nome).toEqual('Lily');
        });
    });*/
});
