/** Reads a form field as a string; a missing field or an uploaded file becomes empty. */
export function field(data: FormData, name: string): string {
	const value = data.get(name);
	return typeof value === 'string' ? value : '';
}
