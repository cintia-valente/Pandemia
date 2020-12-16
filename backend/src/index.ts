import { connect } from 'mongoose';
import { PatientRepo } from './persistencia/Repository/patientRepository';
import { AttendanceRepo } from './persistencia/Repository/attendanceRepository';
import { UnitRepo } from './persistencia/Repository/unitRepository';
import app from './app';
import { Console } from 'console';

async function main() {
    const url = 'mongodb://localhost:27017/projeto-pandemia'

    try {
        const cliente = await connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado');

        //conecta o servidor express
        const server = app.listen(app.get('port'),()=>{
            console.log(`Express na porta ${app.get('port')}`);
        });
    } catch (erro) {
        console.log(`Erro: ${erro}`);
    }
}
main();