const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Define routes related to user management
router.get('/', userController.getAllUsers);
router.get('/name/:name', userController.getAllUsersByFirstName);
router.get('/id/:id', userController.getAllUsersById);
router.post('/', userController.createUser);
//router.put('/:id', userController.updateUserById);
//router.delete('/:id', userController.deleteUserByName);
router.delete('/name/:name', userController.deleteUsersByFirstName);

module.exports = router;