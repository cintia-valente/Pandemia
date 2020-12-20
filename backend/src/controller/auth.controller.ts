import express from 'express';
import { default as authConfig } from '../config/auth';
import { Usuarios } from '../persistencia/model/usuarioModel';
import { Usuario } from '../entidades/usuario';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export async function postUser(req: express.Request, res: express.Response, next: express.NextFunction){
   const {email} = req.body;
   try{
       if(await Usuarios.findOne({email})) return res.status(400).send({error: 'User already exist'});
       const user: Usuario = await Usuarios.create(req.body);
       user.senha = 'undefined';
       return res.send(user);

   }catch(err){
       return res.status(400).send({error: 'Registration failed'});
   }
}

export async function work(req: express.Request, res: express.Response, next: express.NextFunction){
   console.log('work');
}

export async function authUser(req: express.Request, res: express.Response, next: express.NextFunction){
    const {email,password} = req.body;
    const user = await Usuarios.findOne({email}).select('+password');

    if(!user) return res.status(400).send({error: 'User not found'});
    //console.log(user.password,password);
    await bcrypt.compare(password,user.senha,function(err, r){
         if(err){
            return res.status(400).send({error: 'Erro no login'});
         }
         if(r){
            const token = jwt.sign({id: user._id},authConfig.secret,{expiresIn: 86400});
            user.senha = 'undefined';
            res.status(200).json({idtoken:token, user: user});            
         } else{
            return res.status(400).send({error: 'Invalid Password'});
         }
        
        });
        //return res.status(400).send({error: 'Invalid Password'});
         
}

export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send({error: 'No token provided'});
    const parts = authHeader.split(' ');
    if(!(parts.length === 2)) return res.status(401).send({error: 'Token Error'});
    const [scheme,token] = parts;
    if(!/^Bearer$/i.test(scheme)) return res.status(401).send({error: 'Token malformatted'});

    jwt.verify(token,authConfig.secret, (err, decoded)=>{
        if(err) return res.status(401).send({error: 'Token invalid'});
        req.params.userId = (<any>decoded)._id;
        return next();
    });
}
