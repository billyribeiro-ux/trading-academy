import * as v from 'valibot';

/** An email address: trimmed, checked and lowercased, with messages written for people. */
export const emailField = v.pipe(
	v.string('Enter your email address.'),
	v.trim(),
	v.nonEmpty('Enter your email address.'),
	v.email('Enter a valid email address, like name@example.com.'),
	// RFC 5321 limits a deliverable address to 254 characters.
	v.maxLength(254, 'That email address is too long.'),
	v.toLowerCase()
);
