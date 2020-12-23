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
    password:{
        type: String,
        required: true,
        select: false, //quando buscar um usuário o campo password não vai vir junto
    }
});

UsuarioSchema.pre<UsuarioDocument>("save",async function(next:any){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
})

export const Usuarios:mongoose.Model<UsuarioDocument> = mongoose.model<UsuarioDocument>('Usuarios', UsuarioSchema);
