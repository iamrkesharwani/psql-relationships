import express from 'express';
import * as todo from './utils/helper.js';
const app = express();
app.use(express.json());

app.post('/create/user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await todo.createUser(name, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/create/todo', async (req, res) => {
  try {
    const { title, user_id } = req.body;
    const createTodo = await todo.createTodo(title, user_id);
    res.status(201).json(createTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await todo.getTodoByUser(id);
    if (!getTodo) res.status(404).json({ error: 'No todo with this user' });
    res.status(200).json(getTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
