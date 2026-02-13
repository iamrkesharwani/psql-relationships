import express from 'express';
import * as com from './utils/helper.js';
const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const response = await com.getUsers();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const response = await com.getPosts();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const response = await com.getComments();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post('/users/add', async (req, res) => {
  try {
    const { name, email } = req.body;
    const response = await com.addUser(name, email);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post('/posts/add', async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const response = await com.addPost(title, description, user_id);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post('/comments/add', async (req, res) => {
  try {
    const { content, post_id } = req.body;
    const response = await com.addComment(content, post_id);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await com.getCommentsByPost(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await com.getPostByAuthor(id);
    if (response.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
