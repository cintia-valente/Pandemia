import { Paciente } from './paciente';

export interface Atendimento{
    paciente: Paciente,
    data?: Date,
    possibContagio: boolean,
    teste1?: boolean,
    teste2?: boolean,
    tempo: number
}