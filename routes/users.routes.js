const router = require('express').Router();
const { body, param } = require('express-validator');
const usersController = require('../controllers/users.controller');

// Endpoint testujący propagację błędu z funkcji async (musi być przed /:id)
router.get('/async-error', usersController.testAsyncError);

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);

router.post(
  '/',
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  usersController.create
);

router.put(
  '/:id',
  param('id').isInt(),
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  usersController.update
);

router.delete('/:id', usersController.remove);

module.exports = router;