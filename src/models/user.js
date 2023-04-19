const mongoDatabase = require('../config/mongo-database');
const { ObjectId } = require('mongodb');

class User {
    async findAllUsers() {
        try {
            const db = await mongoDatabase.connect();
            const collection = db.collection('users');
            return await collection.find({}).toArray();
        } finally {
            await mongoDatabase.close();
        }
    }

    async insertUser(firstName, lastName, email) {
        try {
            const db = await mongoDatabase.connect();
            const collection = db.collection('users');
            return await collection.insertOne({ firstName, lastName, email });
        } finally {
            await mongoDatabase.close();
        }

    }

    async deleteUsersByFirstName(firstName) {
        try {
            const findResults = await this.findUsersByFirstName(firstName);
            const db = await mongoDatabase.connect();
            const collection = db.collection('users');
            let results = [];
            if (findResults.length > 0) {
                for (let result of findResults) {
                    console.log('result.id');
                    console.log(result._id.toString());
                    const deleteResult = await collection.deleteOne({ _id: result._id });
                    console.log(deleteResult)
                    if (deleteResult) {
                        results.push([result, deleteResult]);
                    }
                };
                return results;
            } else {
                return { message: `No users deleted with first name ${firstName}` };
            }
        } finally {
            await mongoDatabase.close();
        }
    }

    async findUsersByFirstName(firstName) {
        try {
            const db = await mongoDatabase.connect();
            const collection = db.collection('users');
            const results = await collection.find({ firstName: firstName }).toArray();
            if (results.length > 0) {
                return results;
            } else {
                return { message: `No users found with the name ${firstName}` }
            }
        } finally {
            await mongoDatabase.close();
        }
    }

    async findUsersById(userId) {
        try {
            const db = await mongoDatabase.connect();
            const collection = db.collection('users');
            const results = await collection.find({ _id: new ObjectId(userId) }).toArray();
            if (results.length > 0) {
                return results;
            } else {
                return { message: `No users found with id ${userId}` }
            }
        } finally {
            await mongoDatabase.close();
        }
    }

}

module.exports = new User();