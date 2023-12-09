const express = require("express");
const app = express();
const port = process.env.PORT ?? 3030;
app.use(express.json());

const passGenerator = require("./passgenerator.js");
const { getMongoCollection } = require("./mongo-client.js");
const { ObjectId } = require("mongodb");

//Get para listar todas as senhas criadas na app
app.get('/get-all-pass', async (req, res) => {
    const collection = await getMongoCollection("created");
    const found = await collection.find({}).toArray();

    res.status(200).json(found);
})

//Post para criar senha e salvar na base de dados
app.post('/create-pass', async (req, res) => {
    const generator = passGenerator.passGenerator();
    const description = req.body.descricao;
    const data = new Date();
    const collection = await getMongoCollection("created");

    await collection.insertOne({descricao: description, senha: generator, criacao: data});

    res.status(200).json({descricao: description, senha: generator, criacao: data});
})

//Patch para alterar descrição de senha criada por ID
app.patch('/edit-pass/:id', async (req, res) => {
    const idpassed = new ObjectId(req.params.id);
    const description = req.body.descricao;
    const collection = await getMongoCollection("created");

    const found = await collection.updateOne({_id: idpassed}, 
        { $set: {descricao: description}}
        )

        res.sendStatus(200);
})

//Delete para excluir passe da base de dados por ID
app.delete('/delete-pass/:id', async (req, res) => {
    const idpassed = new ObjectId(req.params.id);
    const collection = await getMongoCollection("created");
    const found = await collection.deleteOne({_id: idpassed});

    res.sendStatus(200);
})

module.exports = app;

app.listen(port);
console.log(`Em execução na porta ${port}`)