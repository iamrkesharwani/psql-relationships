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
    const { author, postId } = req.query;

    if (author) {
      const response = await com.commentWithAuthor(author);
      return res.status(200).json(response);
    }

    if (postId) {
      const response = await com.commentPostAuthor(postId);
      return res.status(200).json(response);
    }

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

app.post('/comments/add', async (req, res) => {
  try {
    const { content, user_id, post_id } = req.body;
    const response = await com.addComment(content, user_id, post_id);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
