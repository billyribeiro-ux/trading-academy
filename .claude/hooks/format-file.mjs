// PostToolUse hook: formats the file Claude just wrote or edited with Prettier.
// Claude Code sends the tool call as JSON on stdin; we read `tool_input.file_path`.
import { execFileSync } from 'node:child_process';

let input = '';
for await (const chunk of process.stdin) input += chunk;

const filePath = JSON.parse(input)?.tool_input?.file_path;

if (typeof filePath === 'string' && filePath.length > 0) {
	try {
		// --ignore-unknown skips files Prettier has no parser for instead of failing.
		execFileSync('pnpm', ['exec', 'prettier', '--write', '--ignore-unknown', filePath], {
			stdio: 'ignore'
		});
	} catch {
		// Formatting is a convenience. Never block Claude because a file failed to format;
		// `pnpm lint` in the verify gate still catches it.
	}
}
