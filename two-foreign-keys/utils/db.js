import pg from 'pg';
import 'dotenv/config';
const { Pool } = pg;
const isProd = process.env.NODE_ENV === 'production';

const pool = new Pool(
  process.env.DB_URL
    ? {
        connectionString: process.env.DB_URL,
        ssl: isProd ? { rejectUnauthorized: false } : false,
      }
    : {
        user: process.env.USER,
        host: process.env.HOST,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      }
);

export default {
  query: (text, params) => pool.query(text, params),
};
