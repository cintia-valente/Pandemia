import express from 'express';
import { Atendimento } from '../entidades/atendimento';
import { AtendimentoRepositorio } from '../persistencia/repositorio/atendimentoRepositorio';

export async function getAtendimentos(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const atendimentos: Atendimento[] = await AtendimentoRepositorio.getAtendimentos();
        res.status(200).json(atendimentos);   
    } catch (error) {
        next(error);
    }
}

export async function getAtendimentoPorId(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id: string = req.params.id;
        const atendimento: Atendimento[] = await AtendimentoRepositorio.getAtendimentoPorId(id);
        if (atendimento !== null) {
            res.status(200).json(atendimento);         
        } else {
            res.sendStatus(404);    
        }
    } catch (error) {
        next(error);
    }
}

export async function getAtendimentoPorUnidadeId(req: express.Request, res: express.Response, next: express.NextFunction):Promise<void> {
    try {
        const id:string = req.params.unidade;
        const andamento:boolean =req.query.andamento == "true";
        const atendimento:Atendimento[] = await AtendimentoRepositorio.getAtendimentoUnidadePorId(id,andamento); // chama funcão que devolve todos atendimentos de uma unidade do BD
        res.json(atendimento);
    } catch (error) {
        next(error);
    }
}

export async function getAtendimentoTempo(req: express.Request, res: express.Response, next: express.NextFunction):Promise<void>{
    try {
        
        let id:string  = req.params.id
        let temPaciente:boolean = req.query.paciente == 'true';
        const tempos:any[]= await AtendimentoRepositorio.getTempo(id, temPaciente);
     
        if(tempos !== null){
            res.status(200);
            res.send(tempos);
        }else{
            res.send('Atendimento não encontrado.');
            res.status(404).end();
        }
    } catch(error) {
        next(error);
    }

}

export async function patchAtendimento(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id:string = req.params.id;
        const atendimentoNovo: Atendimento = req.body as Atendimento;
        if (atendimentoNovo !== null) {
            await AtendimentoRepositorio.patchAtendimento(id, atendimentoNovo);
            res.status(200).send('Atendimento atualizada com sucesso.');         
        } else {
            res.sendStatus(404);    
        }
    } catch (error) {
        next(error);
    }

}

export async function deleteAtendimento(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id: string = req.params.id;
        await AtendimentoRepositorio.deleteAtendimento(id);
        res.status(200).send('Atendimento deletado com sucesso.');    
    } catch (error) {
        next(error);
    }
}

