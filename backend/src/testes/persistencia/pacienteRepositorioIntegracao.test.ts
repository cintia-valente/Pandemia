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

