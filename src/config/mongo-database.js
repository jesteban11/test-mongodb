const { MongoClient } = require('mongodb');

class MongoDatabase {
    constructor() {
        /**
        * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
        * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
        */
        this.uri = 'mongodb://localhost:27017';
        this.connection = null;
        this.client = new MongoClient(this.uri);
    }

    async connect() {
        try {
            // Connect to the MongoDB cluster
            await this.client.connect();
            // Make the appropriate DB calls
            //await this.listDatabases(this.client);

            return this.client.db('bets-alternate')

        } catch (e) {
            console.error(e);
        } /*finally {
            await client.close();
        }*/
    }

    async close() {
        try {
            await this.client.close();
            console.log('Disconnected from database');
        } catch (err) {
            console.error('Error disconnecting from database');
        }
    }

    async listDatabases(client) {
        const databasesList = await client.db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

}

module.exports = new MongoDatabase();