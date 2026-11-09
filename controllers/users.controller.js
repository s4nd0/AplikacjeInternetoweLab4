const { validationResult } = require('express-validator');
const usersService = require('../services/users.service');

async function getAll(req, res) {
  const users = await usersService.getUsers();
  res.status(200).json(users);
}

async function getById(req, res) {
  const id = Number(req.params.id);
  const user = await usersService.getUserById(id);

  if (!user) {
    const error = new Error('Użytkownik nie istnieje');
    error.status = 404;
    throw error;
  }

  res.status(200).json(user);
}

async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser = await usersService.createUser(req.body);
  res.status(201).json(newUser);
}

async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = Number(req.params.id);
  const updatedUser = await usersService.updateUser(id, req.body);

  if (!updatedUser) {
    const error = new Error('Użytkownik nie istnieje');
    error.status = 404;
    throw error;
  }

  res.status(200).json(updatedUser);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  const deleted = await usersService.deleteUser(id);

  if (!deleted) {
    const error = new Error('Użytkownik nie istnieje');
    error.status = 404;
    throw error;
  }

  res.status(204).send();
}

// Funkcja do przetestowania propagacji błędu asynchronicznego z podpunktu 4.5 d)
async function testAsyncError(req, res) {
  throw new Error('Przykładowy błąd z funkcji asynchronicznej');
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  testAsyncError
};