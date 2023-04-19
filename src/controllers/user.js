const user = require('../models/user');

exports.getAllUsers = async (req, res) => {
    console.log('GET');
    try {
        const users = await user.findAllUsers()
        res.send(users);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    console.log('POST');
    try {
        console.log(req.body)
        const { firstName, lastName, email } = req.body;
        const insertResult = await user.insertUser(firstName, lastName, email);
        res.status(201).json([req.body, insertResult]);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUsersByFirstName = async (req, res) => {
    console.log('DELETE');
    try {
        const firstName = req.params.name;
        const findResults = await user.deleteUsersByFirstName(firstName);
        console.log(findResults)
        res.status(201).json(findResults);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsersByFirstName = async (req, res) => {
    console.log('GET');
    try {
        const firstName = req.params.name;
        const findResults = await user.findUsersByFirstName(firstName);
        res.status(201).json(findResults);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsersById = async (req, res) => {
    console.log('GET');
    try {
        const userId = req.params.id;
        const findResults = await user.findUsersById(userId);
        res.status(201).json(findResults);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};