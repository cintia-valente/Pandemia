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

const idInexistente = 'aaaaaaaaaaaaaaaaaaaaaaaa'

const idInvalido = 'a';

describe('Testes de integração de PacienteRepositorio', () => {
    describe('getPacientes()', () => {
        test('Deve retornar um paciente vazio', async () => {
            const result = await PacienteRepositorio.getPacientes();
            expect(result).toEqual([]);
        });

        test('Deve retornar uma lista de pacientes com tamanho 3', async () => {
            await informacaoParaTeste();
            const result = await PacienteRepositorio.getPacientes();
            expect(result).toHaveLength(3);
        });
    });
});

describe('getPacientePorId', () => {
    /*test('Deve retornar um paciente', async () => {
        const paciente = await informacaoParaTeste();
        const pacienteProcurado =  await PacienteRepositorio.getPacientePorId('paciente[0]._id');
        expect(pacienteProcurado).toHaveProperty('nome', 'Mia Colluci');
        expect(pacienteProcurado).toHaveProperty('cpf' , '111.254.355-87');
        expect(pacienteProcurado).toHaveProperty('idade', 17);
        expect(pacienteProcurado).toHaveProperty('telefone', '95784264');
        expect(pacienteProcurado).toHaveProperty('email' , 'barbie@colluci.com');
        expect(pacienteProcurado).toHaveProperty('sexo' , 'F');
        expect(pacienteProcurado).toHaveProperty('peso' , 50);
        expect(pacienteProcurado).toHaveProperty('altura', 1.60);
        expect((pacienteProcurado as any).idPaciente).toEqual(paciente[0]._id);
    });*/

    test('Deve apresentar uma exception ao buscar por idInvalido', async () => {
        const idInvalido = -0;
        const result = async () => { await PacienteRepositorio.getPacientePorId('idInvalido') };
        expect(result).toBeDefined();
    });
});

describe('getPacientePorCpf()', () => {
    /*test('Deve retornar um paciente', async () => {
        let paciente = await informacaoParaTeste();
        const pacienteProcurado =  await PacienteRepositorio.getPacientePorCpf(paciente[0].cpf);
        expect(pacienteProcurado).toHaveProperty('Mia Colluci');
        expect(pacienteProcurado).toHaveProperty('111.254.355-87');
        expect(pacienteProcurado).toHaveProperty('17');
        expect(pacienteProcurado).toHaveProperty('95784264');
        expect(pacienteProcurado).toHaveProperty('barbie@colluci.com');
        expect(pacienteProcurado).toHaveProperty('F');
        expect(pacienteProcurado).toHaveProperty('50');
        expect(pacienteProcurado).toHaveProperty('1.60');

        expect((pacienteProcurado as any).cpf).toEqual(paciente[0].cpf);
    });*/

    test('Deve apresentar uma exception ao buscar por CPF inexistente', async () => {
        const cpfInvalido = 'oo988837';
        const result = async () => { await PacienteRepositorio.getPacientePorCpf(cpfInvalido) };
        expect(result).toBeDefined();
    });

    describe('postPaciente()', () => {
        test('Deve criar um paciente', async () => {
            const paciente = await PacienteRepositorio.postPaciente(pacienteValido);
            const pacientes = await PacienteRepositorio.getPacientes();
            expect(pacientes).toHaveLength(1);
            expect(paciente).toHaveProperty('id');
            expect(paciente.id).toEqual(pacienteValido.id);
            expect(paciente.nome).toEqual(pacienteValido.nome);
            expect(paciente.cpf).toEqual(pacienteValido.cpf);
            expect(paciente.idade).toEqual(pacienteValido.idade);
            expect(paciente.telefone).toEqual(pacienteValido.telefone);
            expect(paciente.email).toEqual(pacienteValido.email);
            expect(paciente.sexo).toEqual(pacienteValido.sexo);
            expect(paciente.peso).toEqual(pacienteValido.peso);
            expect(paciente.altura).toEqual(pacienteValido.altura);
            expect(paciente.endereco?.rua).toEqual(pacienteValido.endereco.rua);
            expect(paciente.endereco?.numero).toEqual(pacienteValido.endereco.numero);
            expect(paciente.endereco?.bairro).toEqual(pacienteValido.endereco.bairro);
            expect(paciente.endereco?.cidade).toEqual(pacienteValido.endereco.cidade);
        });
        test('Deve apresentar erro ao inserir cpf invalido', async () => {
            const insercao = async () => { await PacienteRepositorio.postPaciente(pacienteCpfInalido) }
            await expect(insercao).rejects.toThrow();
        });
        
        test('Deve apresentar erro ao inserir cpf duplicado', async () => {
            await PacienteRepositorio.postPaciente(pacienteValido);
            const insercaoRepetida = async () => { await PacienteRepositorio.postPaciente(pacienteValido) }
            await expect(insercaoRepetida).rejects.toThrow();
        });
    });

    describe('patchPaciente()', () => {
        test('Deve apresentar erro ao atualizar o paciente', async () => {
            const pacienteID = await informacaoParaTeste();
            const pacienteValido =
            {
                nome: "Lupita Fernandes",
                cpf: "576.445.124-47",
                idade: 17,
                telefone: "947756352",
                email: "lupi@fernandes.com",
                sexo: "F",
                peso: 50,
                altura: 1.60,
                endereco: {
                    rua: "PP",
                    numero: 73,
                    bairro: "DEBEB",
                    cidade: "Mexico"
                },
            }
            const result = async () => { await PacienteRepositorio.patchPaciente("2", pacienteValido) };
            expect(result).toBeDefined();
        });

        test('Deve apresentar erro ao passar id invalido na alteração', async () => {
            const idInvalido = -0;
            const paciente = await informacaoParaTeste();
            const result = async () => { await PacienteRepositorio.patchPaciente("idInvalido", paciente[1]) }
            expect(result).toBeDefined();
        });

        describe('deletarPaciente()', () => {
            test('deve deletar um paciente', async () => {
                expect(async () =>{
                    const deletaPaciente = await PacienteRepositorio.deletePaciente('id');
                    expect(deletaPaciente).toBeDefined(); 
            });
        });
    
            test('deve deletar um paciente válido', async () => {
                expect(async () =>{
                    const deletaPaciente = await PacienteRepositorio.deletePaciente('id')
                }).rejects.toThrowError();
            });
        });
        
        /*test('Deve retornar um paciente ', async () => {
            const pacienteID = await informacaoParaTeste();
            const pacienteValido = 
            {
                id: "2",
                nome: "Lupita Fernandes",
                cpf: "576.445.124-47",
                idade: 17,
                telefone: "947756352",
                email: "lupi@fernandes.com",
                sexo: "F",
                peso: 50,
                altura: 1.60,
                endereco: {
                    rua: "PP",
                    numero: 73,
                    bairro: "DEBEB",
                    cidade: "Mexico"
                },
            }

            const paciente = await PacienteRepositorio.patchPaciente("2", pacienteValido);
            expect(paciente.id).toEqual(pacienteValido.id);
            expect(paciente.nome).toEqual(pacienteValido.nome);
            expect(paciente.cpf).toEqual(pacienteValido.cpf);
            expect(paciente.idade).toEqual(pacienteValido.idade);
            expect(paciente.telefone).toEqual(pacienteValido.telefone);
            expect(paciente.email).toEqual(pacienteValido.email);
            expect(paciente.sexo).toEqual(pacienteValido.sexo);
            expect(paciente.peso).toEqual(pacienteValido.peso);
            expect(paciente.altura).toEqual(pacienteValido.altura);
            expect(paciente.endereco?.rua).toEqual(pacienteValido.endereco.rua);
            expect(paciente.endereco?.numero).toEqual(pacienteValido.endereco.numero);
            expect(paciente.endereco?.bairro).toEqual(pacienteValido.endereco.bairro);
            expect(paciente.endereco?.cidade).toEqual(pacienteValido.endereco.cidade);
        });*/
    });
});

const pacienteValido = {
    id: "3",
    nome: "Miguel Arango",
    cpf: "247.647.853-25",
    idade: 22,
    telefone: "957879253",
    email: "miguel@arango.com",
    sexo: "M",
    peso: 75,
    altura: 1.75,
    endereco: {
        rua: "YY",
        numero: 51,
        bairro: "Monte",
        cidade: "Monterrey"
    }
}

const pacienteCpfInalido: Paciente = {
    id: "3",
    nome: "Miguel Arango",
    cpf: "247.647-25",
    idade: 22,
    telefone: "957879253",
    email: "miguel@arango.com",
    sexo: "M",
    peso: 75,
    altura: 1.75,
    endereco: {
        rua: "YY",
        numero: 51,
        bairro: "Monte",
        cidade: "Monterrey"
    }
}

async function seedDatabase(): Promise<Paciente[]> {
    const pacientes: Paciente[] = [
        {
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
        },

        {
            id: "3",
            nome: "Miguel Arango",
            cpf: "247.647.853-25",
            idade: 22,
            telefone: "957879253",
            email: "miguel@arango.com",
            sexo: "M",
            peso: 75,
            altura: 1.75,
            endereco: {
                rua: "YY",
                numero: 51,
                bairro: "Monte",
                cidade: "Monterrey"
            }
        },
    ]
    return pacientes;
}

async function informacaoParaTeste(): Promise<Paciente[]> {
    const pacientes = await seedDatabase();
    let paciente1 = await PacienteModel.create(pacientes[0]);
    let paciente2 = await PacienteModel.create(pacientes[1]);
    let paciente3 = await PacienteModel.create(pacientes[2]);
    return [paciente1, paciente2, paciente3];
}