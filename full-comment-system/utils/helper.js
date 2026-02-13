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

export const addComment = async (content, user_id, post_id) => {
  const query = `
    INSERT INTO comments (content, user_id, post_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const response = await db.query(query, [content, user_id, post_id]);
  return response.rows[0];
};

export const joinPostWithAuthor = async (name) => {
  const query = `
    SELECT
      u.name AS authorName,
      p.title AS postTitle
    FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE u.name = $1;
  `;
  const response = await db.query(query, [name]);
  return response.rows;
};

export const commentWithAuthor = async (name) => {
  const query = `
    SELECT
      c.content AS commentContent,
      u.name AS postAuthor
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE u.name = $1;
  `;
  const response = await db.query(query, [name]);
  return response.rows;
};

export const commentPostAuthor = async (post_id) => {
  const query = `
    SELECT
      pu.name AS userName,
      p.title AS postTitle,
      c.content AS commentContent
    FROM posts p
    JOIN users pu ON pu.id = p.user_id
    LEFT JOIN comments c ON c.post_id = p.id
    LEFT JOIN users cu ON cu.id = c.user_id
    WHERE p.id = $1;
  `;
  const response = await db.query(query, [post_id]);
  return response.rows[0];
};
