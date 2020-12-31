import { connect } from 'mongoose';
import { PacienteRepositorio } from './persistencia/repositorio/pacienteRepositorio';
import { AtendimentoRepositorio } from './persistencia/repositorio/atendimentoRepositorio';
import { UnidadeRepositorio } from './persistencia/repositorio/unidadeRepositorio';
import app from './app';
import { Console } from 'console';

async function main() {
    const url = 'mongodb://localhost:27017/pandemia';

    try {
        const cliente = await connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado');
      
        //conecta o servidor express:
        const server = app.listen(app.get('port'), () => {
            console.log(`Express na porta ${app.get('port')}`);

        });
    } catch (erro) {
        console.log(`Erro: ${erro}`);
    }
}
main();