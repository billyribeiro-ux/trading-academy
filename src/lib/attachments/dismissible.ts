import type { Attachment } from 'svelte/attachments';

/**
 * Closes a `<details>` menu the way people expect a dropdown to behave: on Escape (focus
 * returns to the menu button), on a click outside the menu, and when a link inside it is
 * followed. Native `<details>` only toggles from its own `<summary>`.
 */
export const dismissible: Attachment<HTMLDetailsElement> = (details) => {
	function close({ restoreFocus }: { restoreFocus: boolean }) {
		if (!details.open) return;
		details.open = false;
		if (restoreFocus) details.querySelector('summary')?.focus();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close({ restoreFocus: true });
	}

	function onPointerdown(event: PointerEvent) {
		if (event.target instanceof Node && !details.contains(event.target)) {
			close({ restoreFocus: false });
		}
	}

	function onClick(event: MouseEvent) {
		if (event.target instanceof Element && event.target.closest('a')) {
			close({ restoreFocus: false });
		}
	}

	details.addEventListener('keydown', onKeydown);
	details.addEventListener('click', onClick);
	document.addEventListener('pointerdown', onPointerdown);

	return () => {
		details.removeEventListener('keydown', onKeydown);
		details.removeEventListener('click', onClick);
		document.removeEventListener('pointerdown', onPointerdown);
	};
};
