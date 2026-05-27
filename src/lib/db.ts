import { Pool } from "pg";

const rawConnectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

function getConnectionString() {
  if (!rawConnectionString) {
    return rawConnectionString;
  }

  const url = new URL(rawConnectionString);
  url.searchParams.delete("sslmode");

  return url.toString();
}

export const pool = new Pool({
  connectionString: getConnectionString(),
  ssl: {
    rejectUnauthorized: false,
  },
});
