const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/users')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.post('/login', authController.login);

router
  .route('/items')
  .get(authController.protect, userController.getAllItems)
  .patch(userController.updateUser)
  .post(authController.protect, userController.addItem)
  .delete(userController.deleteUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);



module.exports = router;