import ChartLineUpIcon from 'phosphor-svelte/lib/ChartLineUpIcon';
import ChatsCircleIcon from 'phosphor-svelte/lib/ChatsCircleIcon';
import GraduationCapIcon from 'phosphor-svelte/lib/GraduationCapIcon';
import MonitorPlayIcon from 'phosphor-svelte/lib/MonitorPlayIcon';
import type { IconComponent } from './types.ts';

/** One reason to join, shown as an icon with a short line of text. */
export interface ValueProp {
	readonly icon: IconComponent;
	readonly title: string;
	readonly text: string;
}

export const valueProps: readonly ValueProp[] = [
	{
		icon: MonitorPlayIcon,
		title: 'Watch',
		text: 'Placeholder text: experienced traders trade the markets live, from the open to the close.'
	},
	{
		icon: ChatsCircleIcon,
		title: 'Chat',
		text: 'Placeholder text: ask questions in real time with a community of traders like you.'
	},
	{
		icon: GraduationCapIcon,
		title: 'Learn',
		text: 'Placeholder text: work through a library of courses at your own pace.'
	},
	{
		icon: ChartLineUpIcon,
		title: 'Find',
		text: 'Placeholder text: spot high-probability setups with proprietary tools.'
	}
];
