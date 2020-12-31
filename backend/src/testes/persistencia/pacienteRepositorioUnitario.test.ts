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

describe('Testes unitários de PacienteRepositorio', () => {
    describe('getPacientes()', () => {
        test('Deve retornar o(s) paciente(s) criado(s) e o número de pacientes', async () => {
            const mockPacienteRepositorioInput = await getMockPacientes();
            expect(mockPacienteRepositorioInput).toBeDefined();
            expect(mockPacienteRepositorioInput).toHaveLength(2);
        });

        test('Deve apresentar um erro ao criar um paciente', async () => {
            const mockPacienteRepositorioErro = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroPaciente = await getMockPacientes();
            expect(erroPaciente).toBeDefined();

        });
    });

    describe('getPacientePorId()', () => {
        test('Deve buscar um paciente pelo id', async () => {
            const mockPacienteRepositorioBuscarPorId = jest
                .spyOn(PacienteRepositorio, 'getPacientePorId')
                .mockResolvedValue(mockPaciente);

            const resultPacienteId = await PacienteRepositorio.getPacientePorId('id');
            expect(resultPacienteId).toBeDefined();
            expect(mockPacienteRepositorioBuscarPorId).toHaveBeenCalledWith('id');
        });

        test('Requer um id válido', async () => {
            const mockPacienteRepositorioBuscarPorId = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));

            const erroIdPaciente = await PacienteRepositorio.getPacientePorId('id');
            expect(erroIdPaciente).toBeDefined();
        });
    });

    describe('getPacientePorCpf()', () => {
        test('Deve retornar um paciente', async () => {
            const mockPacienteCPF = jest
                .spyOn(PacienteRepositorio, 'getPacientePorCpf')
                .mockResolvedValue(mockPaciente);

            const mockCpf = "862.587.023-77"

            const result = await PacienteRepositorio.getPacientePorCpf(mockCpf);
            expect(result).toBeTruthy();
            expect(mockPacienteCPF).toHaveBeenCalledWith(mockCpf);
        });

        test('Deve retornar null', async () => {
            const mockPacienteRepositorioCPF = jest
                .spyOn(PacienteRepositorio, 'getPacientePorCpf')
                .mockResolvedValue(null);

            const mockCpf = "125.754.455-54"
            const result = await PacienteRepositorio.getPacientePorCpf(mockCpf);
            expect(result).toBe(null);
        });
    });

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

    describe('patchPaciente()', () => {
        test('Deve alterar um paciente', async () => {
            const mockPacienteAlterar = jest.spyOn(PacienteRepositorio, 'patchPaciente')
                .mockResolvedValue(mockPaciente);

            const mockId = "5erf151frf";

            const result = await PacienteRepositorio.patchPaciente(mockId, mockPaciente);
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('idPaciente');
        });

        test('Deve apresentar erro ao alterar um paciente', async () => {
            jest.spyOn(PacienteRepositorio, 'patchPaciente')
                .mockRejectedValue(new Error());

            const mockId = "585defr896dff";

            const alteracao = async () => { await PacienteRepositorio.patchPaciente(mockId, mockPaciente) };
            expect(alteracao).rejects.toThrow();
        });
    });

    describe('deletePaciente()', () => {
        test('Deve deletar um paciente', async () => {
            const mockPacienteDeletar = jest.spyOn(PacienteRepositorio, 'deletePaciente')
            .mockResolvedValue(mockPaciente);

            const mockId = "5erf151frf";

            const result = await PacienteRepositorio.deletePaciente(mockId);
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('idPaciente');
            expect(mockPacienteDeletar).toHaveBeenCalledWith(mockId);
        });

        test('Deve apresentar erro ao deletar um paciente', async () => {
            jest.spyOn(PacienteRepositorio, 'deletePaciente')
                .mockRejectedValue(new Error());

            const mockId = "5erf151frf";
            
            const exclusao = async () => { await PacienteRepositorio.deletePaciente(mockId) }
            expect(exclusao).rejects.toThrow();
        });
    });
});

const mockPaciente = {
    idPaciente: "1", 
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
    idPaciente: "1", 
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
    idPaciente: "1", 
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

function getMockPacientes() {
    const pacientes: Paciente[] = [
        {
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
    return pacientes;
}


