import mysql from 'mysql2/promise';

// Types
type QueryParams = string | number | boolean | null | Buffer | Date;
type QueryResult = Record<string, unknown>[];

// Database config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Query helper
export async function query<T = QueryResult>(
  sql: string, 
  params: QueryParams[] = []
): Promise<T> {
  try {
    const [results] = await pool.query(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(error instanceof Error ? error.message : 'Database query failed');
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
