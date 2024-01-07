/** @type {import('tailwindcss').Config}*/
import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	safelist: [
		'xl:grid-cols-1',
		'xl:grid-cols-2',
		'xl:grid-cols-3',
		'xl:grid-cols-4',
		'xl:grid-cols-5',
		'xl:grid-cols-6',
		'xl:grid-cols-7',
		'xl:grid-cols-8',
		'xl:grid-cols-9',
		'xl:grid-cols-10',
		'lg:grid-cols-1',
		'lg:grid-cols-2',
		'lg:grid-cols-3',
		'lg:grid-cols-4',
		'lg:grid-cols-5',
		'lg:grid-cols-6',
		'lg:grid-cols-7',
		'lg:grid-cols-8',
		'lg:grid-cols-9',
		'lg:grid-cols-10',
		'md:grid-cols-1',
		'md:grid-cols-2',
		'md:grid-cols-3',
		'md:grid-cols-4',
		'md:grid-cols-5',
		'md:grid-cols-6',
		'md:grid-cols-7',
		'md:grid-cols-8',
		'md:grid-cols-9',
		'md:grid-cols-10',
	],
	theme: {
		extend: {}
	},

	plugins: [
		skeleton({
			themes: { preset: ['rocket'] }
		})
	]
} satisfies Config;

export default config;