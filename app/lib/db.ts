import { Pool } from "pg";

const connectionString = "postgresql://postgres:BT&TAgency2026@db.grpunoywxjqhzqsjbtgg.supabase.co:5432/postgres";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
