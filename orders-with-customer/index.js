import express from 'express';
import * as order from './utils/helper.js';
const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const response = await order.getUsers();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const response = await order.getOrders();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/orders/:userName', async (req, res) => {
  try {
    const { userName } = req.params;
    const response = await order.getOrderFromUsers(userName);
    if (response.length === 0) {
      return res.status(404).json({ Error: 'No orders for this user' });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
