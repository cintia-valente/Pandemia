import express from 'express';
import { default as authConfig } from '../config/auth';
import { Usuarios } from '../persistencia/model/usuarioModel';
import { Usuario } from '../entidades/usuario';
import * as bcrypt from 'bcrypt'; //encriptador da senha
import * as jwt from 'jsonwebtoken'; //token

export async function postUser(req: express.Request, res: express.Response, next: express.NextFunction){
   const {email} = req.body;
   try{
       if(await Usuarios.findOne({email})) return res.status(400).send({error: 'User already exist'});
       const user: Usuario = await Usuarios.create(req.body);
       user.password = 'undefined';  //não retorna o password criptografado
       return res.send(user);

   }catch(err){
       return res.status(400).send({error: 'Registration failed'});
   }
}

export async function work(req: express.Request, res: express.Response, next: express.NextFunction){
   console.log('work');
}

//Autenticação
export async function authUser(req: express.Request, res: express.Response, next: express.NextFunction){
    const { email, password } = req.body; //recebe no body da requisição o email e a senha
    const user = await Usuarios.findOne({email}).select('+password'); //verifica se a senha do usuário é realmente a senha dele

    if(!user) return res.status(400).send({error: 'User not found'}); //se não encontrou o usuário, retorna uma mensagem de erro
    
    await bcrypt.compare(password, user.password, function(err, r){ //verifica se a senha que o usuário digitou é a mesma que está no banco de dados
         if(err){ 
            return res.status(400).send({error: 'Erro no login'});
         }
         if(r){ //gerar token:
            const token = jwt.sign({id: user._id}, authConfig.secret, {expiresIn: 86400}); 
            /*o token recebe o sign que indica que ao fazer o login vai passar uma informação que 
              diferencia um token de outro, diferencia um usuário de outro, esta informação é o id, 
              porque o id nunca vai ser repetido, além disso recebe o hash e o tempo de expiração 
              do token, que por padrão é 86400 segundos = 1 dia.*/
              
            user.password = 'undefined'; //não retorna o password criptografado
            res.status(200).json({idtoken:token, user: user});            
         } else{ //se as senhas não são iguais retorna um erro
            return res.status(400).send({error: 'Invalid Password'});
         }
      });
}

//Valida se o token está correto quando o usuário faz uma requisição:
export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){
    const authHeader = req.headers.authorization; //busca o header(autenticação)
   
    //se não tiver uma autenticação, retorna uma mensagem dizendo que o token não foi informado:
    if(!authHeader) return res.status(401).send({error: 'No token provided'}); 
    
    //formato certo de um token jwt por exemplo, Bearer uwenuewnfuiwnfu8415145efunhwfnw
    const parts = authHeader.split(' '); //então separa as duas partes(Bearer e o token)
    
    //verifica se tem as duas partes:
    if(!(parts.length === 2)) 
      return res.status(401).send({error: 'Token Error'});

    //se tiver as duas partes desestrutura para receber o bearer e o token:
    const [scheme,token] = parts;

    //verifica se o scheme está escrito, se começa com Bearen
    //^ indica o início, $ indica o final, / para terminar e o i que indica que é case e sensitive:
    if(!/^Bearer$/i.test(scheme)) 
      return res.status(401).send({error: 'Token malformatted'});
    
    /*verifica se o token do usuário que está pedindo a requisição é válido:
      recebe o token, o hash, e um callback (o erro se tiver e a variável decode 
      que é o id do usuário caso o token tiver certo)*/
    jwt.verify(token, authConfig.secret, (err, decoded) => { 
        if(err) return res.status(401).send({error: 'Token invalid'}); //se o token tiver algum erro, retorna uma mensagem de erro
        req.params.userId = (<any>decoded)._id; //se tiver certo, então inclui o id nas próx requisições
        return next();
    });
}
