import db from './db.js';

export const addTag = async (name) => {
  const query = 'INSERT INTO tags (name) VALUES ($1) RETURNING *;';
  const response = await db.query(query, [name]);
  return response.rows[0];
};

export const addPostTag = async (postId, tagId) => {
  const query = `
    INSERT INTO post_tags (post_id, tag_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [postId, tagId];
  const response = await db.query(query, values);
  return response.rows[0];
};

export const getTagsForPost = async (postId) => {
  const query = `
    SELECT
      t.name AS tagName
    FROM tags t
    JOIN post_tags pt ON pt.tag_id = t.id
    WHERE pt.post_id = $1;
  `;
  const response = await db.query(query, [postId]);
  return response.rows;
};

export const getPostForTag = async (tagName) => {
  const query = `
    SELECT
      p.title AS postTitle,
      t.name AS tagName
    FROM posts p
    JOIN post_tags pt ON pt.post_id = p.id
    JOIN tags t ON pt.tag_id = t.id
    WHERE t.name = $1;
  `;
  const response = await db.query(query, [tagName]);
  return response.rows;
};
