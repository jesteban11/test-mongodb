const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Define routes related to user management
router.get('/', userController.getAllUsers);
router.get('/:name', userController.getAllUsersByFirstName);
router.post('/', userController.createUser);
//router.put('/:id', userController.updateUserById);
//router.delete('/:id', userController.deleteUserByName);
router.delete('/:name', userController.deleteUsersByFirstName);

module.exports = router;