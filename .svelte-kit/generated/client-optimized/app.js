export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [0,3];

export const dictionary = {
		"/": [~4],
		"/admin": [~14,[3]],
		"/admin/history/[[id]]": [~15,[3]],
		"/admin/pricing/[[id]]": [~16,[3]],
		"/admin/session/[[id]]": [~17,[3]],
		"/admin/user/[[id]]": [~18,[3]],
		"/(app)/(payments)/checkout": [~8,[2]],
		"/(app)/(payments)/checkout/complete": [~9,[2]],
		"/(app)/(payments)/checkout/payment": [~10,[2]],
		"/(app)/dashboard": [~12,[2]],
		"/(app)/(auth)/forgotten": [~5,[2]],
		"/(app)/(auth)/login": [6,[2]],
		"/(app)/(payments)/pricing": [~11,[2]],
		"/(app)/profile": [~13,[2]],
		"/(app)/(auth)/regisitor": [~7,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';