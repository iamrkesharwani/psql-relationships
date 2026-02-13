import express from 'express';
import * as todo from './utils/helper.js';
const app = express();
app.use(express.json());

app.post('/todos/add', async (req, res) => {
  try {
    const { title, user_id } = req.body;
    const response = await todo.addTodo(title, user_id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/todos/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await todo.todoTitleUsername(username);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const response = await todo.getUsers();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const response = await todo.getTodos();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post('/users/add', async (req, res) => {
  try {
    const { name, email } = req.body;
    const response = await todo.addUser(name, email);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
