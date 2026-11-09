const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// a) Własne middleware aplikacyjne z czasem rozpoczęcia obsługi żądania
const logger = (req, res, next) => {
  const startTime = new Date().toISOString();
  console.log(`[${startTime}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

// b) Włączenie parsowania JSON przed trasami korzystającymi z req.body
app.use(express.json());

// c) Obsługa danych z formularzy HTML oraz plików statycznych z katalogu public
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// b) Trasa odbierająca dane JSON
app.post('/api/users', (req, res) => {
  const user = req.body;
  res.status(201).json(user);
});

// c) Trasa odbierająca dane z formularza HTML
app.post('/api/users/form', (req, res) => {
  res.status(201).json({
    message: 'Odebrano dane z formularza HTML',
    user: req.body
  });
});

// c) Router z własnym middleware (router-level middleware)
const testRouter = express.Router();

testRouter.use((req, res, next) => {
  console.log('Wykonano middleware przypisane wyłącznie do testRouter');
  next();
});

testRouter.get('/status', (req, res) => {
  res.json({ routerStatus: 'OK' });
});

app.use('/api/router-test', testRouter);

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});