import db from './db.js';

export const getOrderFromUsers = async (userName) => {
  const query = `
    SELECT
      u.name AS userName,
      o.item AS itemName
    FROM orders o
    JOIN users u ON u.id = o.user_id
    WHERE u.name = $1;
  `;
  const response = await db.query(query, [userName]);
  return response.rows;
};

export const getUsers = async () => {
  const response = await db.query('SELECT * FROM users;');
  return response.rows;
};

export const getOrders = async () => {
  const response = await db.query('SELECT * FROM orders;');
  return response.rows;
};
