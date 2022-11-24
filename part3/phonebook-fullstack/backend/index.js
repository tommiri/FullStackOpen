const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req, res) => {
  const bodyLength = Object.keys(req.body).length;
  if (bodyLength === 0) {
    return '';
  }
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
);

let people = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },

  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },

  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },

  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

const generateId = () => Math.floor(Math.random() * 99999);

app.get('/info', (req, res) => {
  const date = new Date();

  res.send(
    `<div>
      <p>Phonebook has info for ${people.length} people</p>
      <p>${date}</p>
    </div>`
  );
});

app.get('/api/people', (req, res) => {
  res.json(people);
});

app.get('/api/people/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = people.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post('/api/people', (req, res) => {
  const body = req.body;
  const foundName = people.find(
    (person) => person.name === body.name
  );
  const foundNumber = people.find(
    (person) => person.number === body.number
  );

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: `${body.name ? 'number' : 'name'} missing`,
    });
  }

  if (foundName || foundNumber) {
    return res.status(400).json({
      error: `${foundName ? 'name' : 'number'} must be unique`,
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  people = people.concat(person);

  res.json(person);
});

app.delete('/api/people/:id', (req, res) => {
  const id = Number(req.params.id);
  people = people.filter((person) => person.id !== id);

  res.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
