<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let tableSimple: TableSource = {
		head: [
			'id',
			'user_id',
			'store_type',
			'image_location',
			'image_type',
			'image_description',
			'shop_description',
			'product_description',
			'charactor_size',
			'temperature',
			'generated_title',
			'generated_description',
			'generated_keywords',
			'count_title',
			'count_description',
			'generated_json',
			'created_at',
			'updated_at',
			'deleted_at',
			'User'
		],
		body: [],
		meta: [],
		foot: []
	};

	onMount(async () => {
		const data = await getUsers();

		const fetchedData = data.user;
		console.log('fetchedData', fetchedData);
		tableSimple = {
			...tableSimple,
			body: tableMapperValues(fetchedData, [
				'id',
				'user_id',
				'store_type',
				'image_location',
				'image_type',
				'image_description',
				'shop_description',
				'product_description',
				'charactor_size',
				'temperature',
				'generated_title',
				'generated_description',
				'generated_keywords',
				'count_title',
				'count_description',
				'generated_json',
				'created_at',
				'updated_at',
				'deleted_at',
				'User'
			]),
			meta: tableMapperValues(fetchedData, [
				'id',
				'user_id',
				'store_type',
				'image_location',
				'image_type',
				'image_description',
				'shop_description',
				'product_description',
				'charactor_size',
				'temperature',
				'generated_title',
				'generated_description',
				'generated_keywords',
				'count_title',
				'count_description',
				'generated_json',
				'created_at',
				'updated_at',
				'deleted_at',
				'User'
			]),
			foot: ['Total', '', `<code class="code">${data.message}</code>`]
		};
	});

	async function getUsers() {
		const response = await fetch('api/admin/history', {
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
			window.location.href = '/admin/history/' + event.detail[0];
		} catch (error) {
			console.error('Error Description script:', error);
		}
	}
</script>

<Table interactive={true} source={tableSimple} on:selected={clicklink} />
