const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
// let todos = [];

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL',
  database: 'todo_app',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL Database!');
});

// RESTful API Endpoints

// API to fetch all todos
app.get('/api/todos', (req, res) => {
  const query = 'SELECT * FROM todos';
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// API to add a new todo
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  const query = 'INSERT INTO todos (task) VALUES (?)';
  db.query(query, [task], (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: 'Todo added successfully!', id: result.insertId });
  });
});

// API to delete a todo by ID
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM todos WHERE id = ?';
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: 'Todo deleted successfully!' });
  });
});
// API to update the completion status of a todo by ID
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updateQuery = 'UPDATE todos SET completed = ? WHERE id = ?';
  db.query(updateQuery, [completed, id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: 'Todo updated successfully!' });
  });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});