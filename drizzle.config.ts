import { defineConfig } from 'drizzle-kit';

// drizzle-kit reads `.env` itself, so this works for `pnpm db:*` scripts with no extra setup.
const url = process.env['DATABASE_URL'];
if (!url) throw new Error('DATABASE_URL is not set. Copy .env.example to .env first.');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: { url },
	verbose: true,
	strict: true
});
