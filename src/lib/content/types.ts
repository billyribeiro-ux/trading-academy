import type MonitorPlayIcon from 'phosphor-svelte/lib/MonitorPlayIcon';

/**
 * Any Phosphor icon component, so content files can reference icons as data. Every icon has
 * the same component type; one icon's type stands for all of them, which keeps type-checking
 * from loading the package's 1,500+ icon declarations through its root entry.
 */
export type IconComponent = typeof MonitorPlayIcon;
