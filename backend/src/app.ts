import express from 'express';
import bodyParser from 'body-parser';
import {path as path, router as router, router2} from './controller/routes';
import errorhandler from 'errorhandler';
import cors from 'cors';

const app = express();
app.set('port', 3100);
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    app.use(cors());
    next();
});
app.use(bodyParser.json());
app.use(path,router);
app.use(path,router2);
app.use(errorhandler());

export default app;
