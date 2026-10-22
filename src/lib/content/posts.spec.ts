import { describe, expect, it } from 'vitest';
import { allPosts, findPost, formatPostDate, latestPosts } from './posts.ts';

describe('posts', () => {
	it('lists posts newest first', () => {
		const dates = allPosts.map((post) => Date.parse(post.publishedAt));
		expect(dates).toEqual([...dates].sort((a, b) => b - a));
	});

	it('uses unique, URL-safe slugs', () => {
		const slugs = allPosts.map((post) => post.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
	});

	it('never has an update date before the publish date', () => {
		for (const post of allPosts) {
			expect(Date.parse(post.updatedAt)).toBeGreaterThanOrEqual(Date.parse(post.publishedAt));
		}
	});

	it('finds a post by slug and returns undefined for unknown slugs', () => {
		const first = allPosts[0];
		expect(first && findPost(first.slug)).toBe(first);
		expect(findPost('does-not-exist')).toBeUndefined();
	});

	it('returns at most the requested number of latest posts', () => {
		expect(latestPosts(2)).toHaveLength(2);
	});
});

describe('formatPostDate', () => {
	it('prints a long US date in the site time zone', () => {
		expect(formatPostDate('2026-10-12T08:00:00-05:00')).toBe('October 12, 2026');
	});
});
