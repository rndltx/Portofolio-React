import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Add type for database responses
export interface DBAboutData {
  id: number;
  name: string;
  title: string;
  description: string;
  skills: string;
}

export interface DBSlide {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
}

export default pool;