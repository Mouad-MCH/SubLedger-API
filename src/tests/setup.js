import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { mongo } from 'mongoose'
import { afterEach, beforeAll } from 'vitest'

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri)
})


afterEach(async () => {
    const collections = mongoose.connection.collections;
    for(const key in collections) {
        await collections[key].deleteMany({});
    }
})

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
})

