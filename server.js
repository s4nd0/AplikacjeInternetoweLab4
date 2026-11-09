const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Witaj w aplikacji Express!');
});

app.get('/contact', (req, res) => {
  res.send('Kontakt: kontakt@politechnika.lublin.pl');
});

app.get('/api/info', (req, res) => {
  res.json({
    application: 'Express LAB4',
    version: '1.0'
  });
});

// b) Parametry zapytania - zdefiniowane PRZED /api/users/:id
app.get('/api/users/search', (req, res) => {
  const { name, page = 1 } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Parametr name jest wymagany' });
  }
  res.status(200).json({ name, page: Number(page) });
});

// a) Parametry ścieżki
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Identyfikator musi być liczbą' });
  }
  if (id > 100) {
    return res.status(404).json({ error: 'Użytkownik nie istnieje' });
  }
  res.status(200).json({
    message: 'Pobrano użytkownika',
    id: id
  });
});

// c) Przykładowe trasy POST, PUT i DELETE z odpowiednimi kodami statusu
app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'Utworzono nowego użytkownika' });
});

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Nieprawidłowy format ID' });
  }
  if (id > 100) {
    return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
  }
  res.status(200).json({ message: 'Zaktualizowano użytkownika', id });
});

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id > 100) {
    return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
  }
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});