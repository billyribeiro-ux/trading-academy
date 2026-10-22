import { DATABASE_URL } from '$app/env/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

/**
 * The single database connection pool for the server. Files under `src/lib/server/` can never
 * be imported into browser code, so the connection string cannot leak to visitors.
 */
const client = postgres(DATABASE_URL);

export const db = drizzle(client, { schema });
