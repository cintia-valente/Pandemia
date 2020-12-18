import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../entidades/usuario';
interface UsuarioDocument extends Usuario, mongoose.Document {} 

const UsuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha:{
        type: String,
        required: true,
        select: false,
    }
});

UsuarioSchema.pre<UsuarioDocument>("save",async function(next:any){
    const hash = await bcrypt.hash(this.senha,10);
    this.senha = hash;
    next();
})

export const Usuarios:mongoose.Model<UsuarioDocument> = mongoose.model<UsuarioDocument>('Usuarios', UsuarioSchema);
