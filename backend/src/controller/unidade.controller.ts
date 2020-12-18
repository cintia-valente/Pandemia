import express from 'express';
import { Unidade } from '../entidades/unidade';
import { UnidadeRepositorio } from '../persistencia/repositorio/unidadeRepositorio';

export async function getUnidades(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const unidades: Unidade[] = await UnidadeRepositorio.getUnidades();
        res.status(200).json(unidades);   
    } catch (error) {
        next(error);
    }
}

export async function getUnidadePorId(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id: string = req.params.id;
        const unidade: Unidade[] = await UnidadeRepositorio.getUnidadePorId(id);
        if (unidade !== null) {
            res.status(200).json(unidade);         
        } else {
            res.sendStatus(404);    
        }
    } catch (error) {
        next(error);
    }
}

export async function getUnidadePorNome(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const nome: string = req.params.nome;
        const unidade: Unidade[] = await UnidadeRepositorio.getUnidadePorNome(nome);
        if (unidade !== null) {
            res.status(200).json(unidade);          
        } else {
            res.sendStatus(404);   
        }
    } catch (error) {
        next(error);
    }
}

export async function patchUnidade(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id:string = req.params.id;
        const unidadeNova: Unidade = req.body as Unidade;
        if (unidadeNova !== null) {
            await UnidadeRepositorio.patchUnidade(id, unidadeNova);
            res.status(200).send('Unidade atualizada com sucesso.');         
        } else {
            res.sendStatus(404);    
        }
    } catch (error) {
        next(error);
    }

}

export async function deleteUnidade(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id: string = req.params.id;
        await UnidadeRepositorio.deleteUnidade(id);
        res.status(200).send('Unidade deletada com sucesso.');    
    } catch (error) {
        next(error);
    }
}
