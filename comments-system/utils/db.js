import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const isProd = process.env.NODE_ENV === 'production';

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: isProd ? { rejectUnauthorized: false } : false,
      }
    : {
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
      }
);

export default {
  query: (text, params) => pool.query(text, params),
};