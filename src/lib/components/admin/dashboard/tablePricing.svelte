<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	// todo: need to change out this table to use the new table component as Skeleton is not functional at all
	let tableSimple: TableSource = {
		head: [
			'id',
			'name',
			'price',
			'description',
			'list',
			'stripe_price_id',
			'visable',
			'created_at',
			'updated_at',
			'deleted_at'
		],
		body: [],
		meta: [],
		foot: []
	};

	onMount(async () => {
		const data = await getPricing();

		const fetchedData = data.user;

		tableSimple = {
			...tableSimple,
			body: tableMapperValues(fetchedData, [
				'id',
				'name',
				'price',
				'description',
				'list',
				'stripe_price_id',
				'visable',
				'created_at',
				'updated_at',
				'deleted_at'
			]),
			meta: tableMapperValues(fetchedData, [
				'id',
				'name',
				'price',
				'description',
				'list',
				'stripe_price_id',
				'visable',
				'created_at',
				'updated_at',
				'deleted_at'
			]),
			foot: ['Total', '', `<code class="code">${data.message}</code>`]
		};
	});

	async function getPricing() {
		const response = await fetch('/api/admin/pricing', {
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
			window.location.href = '/admin/pricing/' + event.detail[0];
		} catch (error) {
			console.error('Error Description script:', error);
		}
	}
</script>

<Table interactive={true} source={tableSimple} on:selected={clicklink}/>
