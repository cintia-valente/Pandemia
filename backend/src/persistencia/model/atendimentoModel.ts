import { Atendimento } from '../../entidades/atendimento';
import { Document, Schema, model, Model, SchemaTypes } from 'mongoose';
import { PacienteModel } from './pacienteModel';
import { } from '../../entidades/unidade'
import { UnidadeModel } from './unidadeModel';
import { types } from 'util';

interface AtendimentoDocument extends Atendimento, Document { }

const AtendimentoSchema = new Schema({
  paciente: { type: SchemaTypes.ObjectId, ref: 'Paciente', required: true },
  data: { type: Date },
  possibContagio: { type: Boolean, required: true },
  teste1: { type: Boolean, required: true },
  teste2: { type: Boolean },
  tempo: { type: Number, required: true },
});

export const AtendimentoModel: Model<AtendimentoDocument> = model<AtendimentoDocument>('Atendimento', AtendimentoSchema, 'atendimentos');
