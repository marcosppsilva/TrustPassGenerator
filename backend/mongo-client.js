const { MongoClient } = require("mongodb");
const URL = process.env.MONGO_URL ?? "mongodb://127.0.0.1:27017";

let client;

async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(URL);
        }
        return client;
    } catch (err) {
        console.log(err);
    }
}

async function getMongoCollection(collectionName, dbName = "trust-pass-generator") {
    const client = await connectToMongo();
    return client.db(dbName).collection(collectionName);
}

module.exports = { 
    getMongoCollection
}