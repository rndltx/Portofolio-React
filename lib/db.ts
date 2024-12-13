import mysql from 'mysql2/promise';

// Add type for query parameters
type QueryParams = string | number | boolean | null | Buffer | Date;

// Add type for query results
type QueryResult = Record<string, unknown>[];

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

export async function query<T = QueryResult>(
  sql: string, 
  params: QueryParams[] = []
): Promise<T> {
  try {
    const [results] = await pool.query(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
