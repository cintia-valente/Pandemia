import { Document, model, Schema, SchemaTypes, Model } from 'mongoose';
import { Paciente } from '../../entidades/paciente';

interface PacienteDocument extends Document, Paciente { }

const EnderecoSchema = new Schema({
    rua: {type: String, required: true, minlength: 1, maxlength: 100},
    numero: {type: Number, required: true, minlength: 1, maxlength: 10},
    bairro: {type: String, required: true, minlength: 1, maxlength: 100},
    cidade: {type: String, required: true, minlength: 1, maxlength: 100}
}); 

const PacienteSchema = new Schema({
    nome: { type: String, required: true, max: 100 },
    cpf: { type: String, required: true, min: 0, max: 14},
    idade: { type: Number, required: true, min: 0 },
    telefone: { type: String, max: 100 },
    email: { type: String, max: 100 },
    sexo: { type: String,  required: true, min: 0 },
    peso: { type: String, min: 0 },
    altura: { type: Number, min: 0},
    endereco: { type: EnderecoSchema }
});

export const PacienteModel: Model<PacienteDocument> = model<PacienteDocument>('Paciente', PacienteSchema, 'Pacientes');
