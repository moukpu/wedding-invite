import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL ?? process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function GET() {
  try {
    const result = await pool.query(`
      CREATE TABLE IF NOT EXISTS guests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attendance VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    return NextResponse.json({ message: 'Table created successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Init DB Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

