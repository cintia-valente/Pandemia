//Código baseado em https://github.com/pawap90/test-mongoose-inmemory

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongod = new MongoMemoryServer();

/**
 * Conectar ao banco de dados em memória.
 */
export async function connect() {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts, (err) => {
        if (err) console.error(err);
    });
};

/**
 * Remove banco, fecha conexão e para o mongod.
 */
export async function closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Remove todos os documentos de todas as coleções.
 */
export async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};



