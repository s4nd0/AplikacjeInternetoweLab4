const express = require('express');
const { body, param, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// a) Początkowa tablica użytkowników w pamięci procesu
let users = [
  { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
  { id: 2, name: 'Anna Nowak', email: 'anna@example.com' }
];

// GET /api/users - lista wszystkich użytkowników
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

// GET /api/users/:id - pojedynczy użytkownik
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Użytkownik nie istnieje' });
  }

  res.status(200).json(user);
});

// POST /api/users - tworzenie użytkownika z walidacją
app.post(
  '/api/users',
  body('name').trim().notEmpty().withMessage('Pole name nie może być puste'),
  body('email').isEmail().withMessage('Niepoprawny adres email'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: nextId,
      name: req.body.name,
      email: req.body.email
    };

    users.push(newUser);
    res.status(201).json(newUser);
  }
);

// PUT /api/users/:id - aktualizacja użytkownika z walidacją parametru :id oraz treści
app.put(
  '/api/users/:id',
  param('id').isInt().withMessage('Parametr id musi być liczbą całkowitą'),
  body('name').trim().notEmpty().withMessage('Pole name nie może być puste'),
  body('email').isEmail().withMessage('Niepoprawny adres email'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Użytkownik nie istnieje' });
    }

    users[index] = {
      id,
      name: req.body.name,
      email: req.body.email
    };

    res.status(200).json(users[index]);
  }
);

// DELETE /api/users/:id - usunięcie użytkownika
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Użytkownik nie istnieje' });
  }

  users.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});