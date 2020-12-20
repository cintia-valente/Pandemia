import express from 'express';
import { Paciente } from '../entidades/paciente';
import { PacienteRepositorio } from '../persistencia/repositorio/pacienteRepositorio';

export async function getPacientes(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const pacientes: Paciente[] = await PacienteRepositorio.getPacientes();
        res.status(200).json(pacientes);   
    } catch (error) {
        next(error);
    }
}

export async function getPacientePorId(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id: string = req.params.id;
        const Paciente: Paciente[] = await PacienteRepositorio.getPacientePorId(id);
        if (Paciente!== null) {
            res.status(200).json(Paciente);         
        } else {
            res.sendStatus(404);    
        }
    } catch (error) {
        next(error);
    }
}

export async function getPacientePorCpf(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const cpf: string = req.params.cpf;
        const paciente: Paciente[] = await PacienteRepositorio.getPacientePorCpf(cpf);
        if (paciente!== null) {
            res.status(200).json(paciente);          
        } else {
            res.sendStatus(404);   
        }
    } catch (error) {
        next(error);
    }
}

export async function postPaciente(req: express.Request, res: express.Response, next: express.NextFunction):Promise<void> {
    try {
        const paciente: any = req.body;
        const postPaciente: Paciente =  await PacienteRepositorio.postPaciente(paciente);

        res.send(postPaciente);
    } catch(error) {
        next(error);
    }
}

export async function patchPaciente(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id:string = req.params.id;
        const pacienteNovo: Paciente= req.body as Paciente;
        if (pacienteNovo !== null) {
            await PacienteRepositorio.patchPaciente(id, pacienteNovo);
            res.status(200).send('Paciente atualizado com sucesso.');         
        } else {
            res.sendStatus(404);    
        }
    } catch (error) {
        next(error);
    }

}

export async function deletePaciente(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id: string = req.params.id;
        await PacienteRepositorio.deletePaciente(id);
        res.status(200).send('Pacientedeletada com sucesso.');    
    } catch (error) {
        next(error);
    }
}

