const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function connectToBetsDatabase() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);


        return await client.db('bets-alternate')

    } catch (e) {
        console.error(e);
    } /*finally {
        await client.close();
    }*/
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.get('/users', async function (req, res) {
    console.log(req.body)
    const db = await connectToBetsDatabase();
    const collection = db.collection('users');
    const users = await collection.find({}).toArray();
    res.send(users);

});

app.post('/users', async function (req, res) {
    const db = await connectToBetsDatabase();
    const collection = db.collection('users');
    console.log(req.body)
    const { firstName, lastName, email } = req.body;
    const insertResult = await collection.insertOne({ firstName, lastName, email });
    res.status(201).json(insertResult);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});