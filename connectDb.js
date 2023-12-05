import "dotenv/config"
import pg from "pg"

const { Pool } = pg

const connection = process.env.PGCONNECT

export const pool = new Pool({
    connectionString: connection,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

