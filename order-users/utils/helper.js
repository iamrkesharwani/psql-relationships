import db from './db.js';

export const createOrder = async (item, user_id) => {
  const query = `
    INSERT INTO orders (item, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const res = await db.query(query, [item, user_id]);
  return res.rows[0];
};

export const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
  const res = await db.query(query, [id]);
  return res.rows[0];
};

export const getOrderByUser = async (id) => {
  const query = 'SELECT * FROM orders WHERE user_id = $1;';
  const res = await db.query(query, [id]);
  return res.rows;
};

export const getUsers = async () => {
  const query = 'SELECT * FROM users;';
  const res = await db.query(query);
  return res.rows;
};
