import { Document, model, Schema, Model } from 'mongoose';
import { Paciente } from '../../entidades/paciente';

interface PacienteDocument extends Document, Paciente { }

const EnderecoSchema = new Schema({
    rua: String,
    numero: Number,
    bairro: String,
    cidade: String
}); 

const PacienteSchema = new Schema({
    _id: { type: String },
    nome: { type: String, required: true, max: 100 },
    cpf: { type: String, required:true, unique:true, validate:/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ },
    idade: { type: Number, required: true},
    telefone: { type: String, max: 100 },
    email: { type: String, max: 100 },
    sexo: { type: String,  required: true, min: 1},
    peso: { type: Number, min: 0 },
    altura: { type: Number, min: 0},
    endereco: { type: EnderecoSchema }
});

export const PacienteModel: Model<PacienteDocument> = model<PacienteDocument>('Paciente', PacienteSchema, 'pacientes');
