import app from './app';

async function main() {

    try {
        //conecta o servidor express
        const server = app.listen(app.get('port'), () => {
            console.log(`Express na porta ${app.get('port')}`);
        });
    } catch (err) {
        console.log(`Erro: ${err}`);
    }
}
main();