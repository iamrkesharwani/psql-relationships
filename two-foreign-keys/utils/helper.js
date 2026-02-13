import db from './db.js';

export const getUsers = async () => {
  const response = await db.query('SELECT * FROM users;');
  return response.rows;
};

export const getPosts = async () => {
  const response = await db.query('SELECT * FROM posts;');
  return response.rows;
};

export const getComments = async () => {
  const response = await db.query('SELECT * FROM comments;');
  return response.rows;
};

export const addUser = async (name, email) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const response = await db.query(query, [name, email]);
  return response.rows[0];
};

export const addPost = async (title, description, user_id) => {
  const query = `
    INSERT INTO posts (title, description, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const response = await db.query(query, [title, description, user_id]);
  return response.rows[0];
};

export const addComment = async (content, post_id) => {
  const query = `
    INSERT INTO comments (content, post_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const response = await db.query(query, [content, post_id]);
  return response.rows[0];
};

export const getCommentsByPost = async (id) => {
  const query = `
    SELECT
      c.content AS commentContent,
      p.title AS postTitle
    FROM comments c
    JOIN posts p ON p.id = c.post_id
    WHERE p.id = $1;
  `;
  const response = await db.query(query, [id]);
  return response.rows;
};

export const getPostByAuthor = async (id) => {
  const query = `
    SELECT
      p.title AS postTitle,
      p.description AS postDesc,
      u.name AS userName
    FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE u.id = $1;
  `;
  const response = await db.query(query, [id]);
  return response.rows;
};
