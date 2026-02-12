import db from './db.js';

export const createUser = async (name, email) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const res = await db.query(query, [name, email]);
  return res.rows[0];
};

export const createTodo = async (title, user_id) => {
  const query = `
    INSERT INTO todos (title, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const res = await db.query(query, [title, user_id]);
  return res.rows[0];
};

export const getTodoByUser = async (id) => {
  const query = 'SELECT * FROM todos WHERE user_id = $1;';
  const res = await db.query(query, [id]);
  return res.rows;
};
