const express = require('express');
const logger = require('./middleware/logger');
const usersRouter = require('./routes/users.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Podłączenie routera użytkowników
app.use('/api/users', usersRouter);

// Middleware obsługujące 404 po wszystkich trasach
app.use(notFound);

// Centralna obsługa błędów zarejestrowana jako ostatnia
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});