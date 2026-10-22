import { test as base } from '@playwright/test';
import postgres from 'postgres';

// Locally the URL lives in .env; in CI it is already in the environment.
if (!process.env['DATABASE_URL']) process.loadEnvFile('.env');

/** Test fixtures that give each Playwright worker its own direct database connection. */
export const test = base.extend<object, { sql: postgres.Sql }>({
	sql: [
		// eslint-disable-next-line no-empty-pattern -- Playwright requires a destructured first argument
		async ({}, use) => {
			const url = process.env['DATABASE_URL'];
			if (!url) throw new Error('DATABASE_URL is not set for end-to-end tests');

			const sql = postgres(url, { max: 1 });
			await use(sql);
			await sql.end();
		},
		{ scope: 'worker' }
	]
});

export { expect } from '@playwright/test';

/** A unique address per test, so tests never collide with each other or with old data. */
export function uniqueEmail(label: string): string {
	return `${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}
