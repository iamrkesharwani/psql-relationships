import express from 'express';
import * as order from './utils/helper.js';
const app = express();
app.use(express.json());

app.post('/create/order', async (req, res) => {
  try {
    const { item, user_id } = req.body;
    const createOrder = await order.createOrder(item, user_id);
    res.status(201).json(createOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await order.deleteUser(id);
    if (!deleteUser) res.status(404).json({ error: "User doesn't exist" });
    res.status(204).json(deleteUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await order.getOrderByUser(id);
    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders for this user' });
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', async (req, res) => {
  try {
    const users = await order.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
