import db from './db.js';

export const todoTitleUsername = async (username) => {
  const query = `
    SELECT
      t.title AS todoTitle,
      u.name AS userName
    FROM todos t
    JOIN users u ON t.user_id = u.id
    WHERE u.name = $1;
  `;
  const response = await db.query(query, [username]);
  return response.rows;
};

export const getUsers = async () => {
  const query = 'SELECT * FROM users;';
  const res = await db.query(query);
  return res.rows;
};

export const getTodos = async () => {
  const query = 'SELECT * FROM todos;';
  const res = await db.query(query);
  return res.rows;
};

export const addTodo = async (title, user_id) => {
  const query = `
    INSERT INTO todos (title, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const res = await db.query(query, [title, user_id]);
  return res.rows[0];
};

export const addUser = async (name, email) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const res = await db.query(query, [name, email]);
  return res.rows[0];
};
