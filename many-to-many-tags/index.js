import express from 'express';
import * as many from './utils/controller.js';
const app = express();
app.use(express.json());

app.post('/add/tag', async (req, res) => {
  try {
    const { name } = req.body;
    const response = await many.addTag(name);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/add/post-tag', async (req, res) => {
  try {
    const { postId, tagId } = req.body;
    const response = await many.addPostTag(postId, tagId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/posts/tags', async (req, res) => {
  try {
    const { postId } = req.query;
    const response = await many.getTagsForPost(postId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tags/post', async (req, res) => {
  try {
    const { tagName } = req.query;
    const response = await many.getPostForTag(tagName);
    if (response.length === 0) {
      return res.status(404).json({ message: 'No posts found for this tag' });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
