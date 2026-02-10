import db from './db.js';

export const createUser = async (name, email) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id, name;
  `;
  try {
    const res = await db.query(query, [name, email]);
    console.log('User created:', res.rows[0].name);
    return res.rows[0].id;
  } catch (err) {
    console.error('Error in User Creation:', err.message);
  }
};

/**
 * @param {string} title
 * @param {string} body
 * @param {number} userId
 */

export const createPost = async (title, body, userId) => {
  const query = `
    INSERT INTO posts (title, body, userId)
    VALUES ($1, $2, $3)
    RETURNING id, title;
  `;
  const values = [title, body, userId];
  try {
    const res = await db.query(query, values);
    console.log(`Post Created: "${res.rows[0].title}" by User ID: ${userId}`);
    return res.rows[0];
  } catch (err) {
    console.error('Error in Post Creation:', err.message);
  }
};

export const getPostWithAuthors = async () => {
  const query = `
    SELECT
      p.id AS postId,
      p.title,
      u.name AS authorName,
      u.email AS authorEmail
    FROM posts p
    INNER JOIN users u
    ON p.userId = u.id;
  `;
  try {
    const res = await db.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error While Fetching:', err.message);
  }
};

export const getPostUsersWithLeftJoin = async () => {
  const query = `
    SELECT
      u.name,
      p.title
    FROM users u
    LEFT JOIN posts p
    ON u.id = p.userId
  `;
  try {
    const res = await db.query(query);
    return res.rows;
  } catch (err) {
    console.error('Fetch Error:', err.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const query = 'DELETE FROM users WHERE id = $1';
    await db.query(query, [userId]);
    console.log(`User ${userId} deleted. Checking posts...`);
  } catch (err) {
    console.error('Delete Error:', err.message);
  }
};
