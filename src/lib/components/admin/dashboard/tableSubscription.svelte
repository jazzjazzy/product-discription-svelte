<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type {Subscription} from '$lib/types/subscription';

	let tableSimple: TableSource = {
		head: ['id', 'user_id', 'User', 'type', 'name','price', 'stripe_status', 'created'],
		body: [],
		meta: [],
		foot: []
	};

	onMount(async () => {
		const data = await getSubscriptions();

		const fetchedData = data.user.map((subscription: Subscription) => {
			return {
				id: subscription.id,
				user_id: subscription.user_id,
				User_name: subscription.User.firstname + ' ' + subscription.User.surname, 
				type: subscription.type,
				Pricing_name: subscription.Pricing.name,
				Pricing_price: `$${subscription.Pricing.price}`, 
				stripe_status: subscription.stripe_status,
				created : subscription.created_at,
			};
		});

		tableSimple = {
			...tableSimple,
			body: tableMapperValues(fetchedData, [
				'id',
				'user_id',
				'User_name',
				'type',
				`Pricing_name`,
				'Pricing_price',
				'stripe_status',
				'created'
			]),
			meta: tableMapperValues(fetchedData, [
				'id',
				'user_id',
				'User_name',
				'type',
				`Pricing_name`,
				'Pricing_price',
				'stripe_status',
				'created'
			]),
			foot: ['Total', '', `<code class="code">${data.message}</code>`]
		};
	});

	async function getSubscriptions() {
		const response = await fetch('/api/admin/subscription', {
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
