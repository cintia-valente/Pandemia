import { Document, model, Schema, SchemaTypes, Model } from 'mongoose';
import { Unidade } from '../../entidades/unidade';

interface UnidadeDocument extends Document, Unidade { }

const EnderecoSchema = new Schema({
    rua: { type: String, required: true, minlength: 1, maxlength: 100 },
    numero: { type: Number, required: true, minlength: 1, maxlength: 10 },
    bairro: { type: String, required: true, minlength: 1, maxlength: 100 },
    cidade: { type: String, required: true, minlength: 1, maxlength: 100 }
}); 

const UnidadeSchema = new Schema({
    nome: { type: String, required: true, max: 100 },
    endereco: { type: EnderecoSchema },
});

export const UnidadeModel: Model<UnidadeDocument> = model<UnidadeDocument>('Unidade', UnidadeSchema, 'unidades');
