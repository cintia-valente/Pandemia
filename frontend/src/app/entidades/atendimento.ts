import { Paciente } from './paciente';

export interface Atendimento {
    idAtendimento?: string,
    idUnidade: string,
    paciente: Paciente | String,
    data?: Date,
    possibContagio: boolean,
    teste1?: boolean,
    teste2?: boolean,
    tempo: number
}
