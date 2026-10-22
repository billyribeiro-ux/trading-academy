import BellRingingIcon from 'phosphor-svelte/lib/BellRingingIcon';
import BroadcastIcon from 'phosphor-svelte/lib/BroadcastIcon';
import ChalkboardTeacherIcon from 'phosphor-svelte/lib/ChalkboardTeacherIcon';
import PresentationChartIcon from 'phosphor-svelte/lib/PresentationChartIcon';
import type { SitePath } from '#lib/config/navigation.ts';
import type { IconComponent } from './types.ts';

/** One of the main products, shown as a card that links to its page. */
export interface Service {
	readonly icon: IconComponent;
	readonly title: string;
	readonly text: string;
	readonly href: SitePath;
}

export const services: readonly Service[] = [
	{
		icon: BroadcastIcon,
		title: 'Live Trading Rooms',
		text: 'Placeholder text: follow seasoned traders as they place real trades in real time and explain every decision.',
		href: 'trading-rooms/day-trading'
	},
	{
		icon: ChalkboardTeacherIcon,
		title: 'Live & On-Demand Classes',
		text: 'Placeholder text: attend interactive sessions or learn at your own pace with recorded classes.',
		href: 'classes'
	},
	{
		icon: PresentationChartIcon,
		title: 'Proprietary Indicators',
		text: 'Placeholder text: put the same indicators our traders use for finding setups on your own charts.',
		href: 'indicators'
	},
	{
		icon: BellRingingIcon,
		title: 'Real-Time Alerts',
		text: 'Placeholder text: get trade alerts from mentors sent straight to your phone, with the reasoning behind each one.',
		href: 'alerts/stock-alerts'
	}
];
