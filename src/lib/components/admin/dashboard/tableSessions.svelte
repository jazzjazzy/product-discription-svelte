<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let tableSimple: TableSource = {
		head: [
			'id',
			'user_id',
			'active_expires',
			'idle_expires',
			'name',
			'role',
			'subscribed',
			'plan',
			'user'
		],
		body: [],
		meta: [],
		foot: []
	};

	onMount(async () => {
		const data = await getSessions();

		const fetchedData = data.user;
		console.log('fetchedData', fetchedData);
		tableSimple = {
			...tableSimple,
			body: tableMapperValues(fetchedData, [
				'id',
				'user_id',
				'active_expires',
				'idle_expires',
				'name',
				'role',
				'subscribed',
				'plan',
				'user'
			]),
			meta: tableMapperValues(fetchedData, [
				'id',
				'user_id',
				'active_expires',
				'idle_expires',
				'name',
				'role',
				'subscribed',
				'plan',
				'user'
			]),
			foot: ['Total', '', `<code class="code">${data.message}</code>`]
		};
	});

	async function getSessions() {
		const response = await fetch('/api/admin/sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});

		const { body } = await response.json();
		return body;
	}

	function clicklink(event: any) {
		try {
			console.log('clicklink', event.detail[0]);
			window.location.href = '/admin/session/' + event.detail[0];
		} catch (error) {
			console.error('Error Description script:', error);
		}
	}
</script>

<Table interactive={true} source={tableSimple} on:selected={clicklink} />
