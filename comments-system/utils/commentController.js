import db from './db.js';

export const addComment = async (postId, userId, content) => {
  const query = `
    INSERT INTO comments (postId, userId, content)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const res = await db.query(query, [postId, userId, content]);
  return res.rows[0];
};

export const getPostDetails = async (id) => {
  const query = `
    SELECT
      p.title AS postTitle,
      author.name AS authorName,
      c.content AS commentContent,
      commenter.name AS commenterName
    FROM posts p
    JOIN users author ON p.userId = author.id
    LEFT JOIN comments c ON c.postId = p.id
    LEFT JOIN users commenter ON c.userId = commenter.id
    WHERE p.id = $1;
  `;
  const res = await db.query(query, [id]);
  return res.rows;
};
