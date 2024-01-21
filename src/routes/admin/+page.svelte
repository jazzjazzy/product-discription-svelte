<script lang="ts">
	import type { PageData } from '../$types';
	import InfoBlock from '$lib/components/admin/dashboard/infoBlock.svelte';
	import TableUsers from '$lib/components/admin/dashboard/tableUsers.svelte';
	import TableSessions from '$lib/components/admin/dashboard/tableSessions.svelte';
	import TableHistory from '$lib/components/admin/dashboard/tableHistory.svelte';
	import TablePricing from '$lib/components/admin/dashboard/tablePricing.svelte';
	import TableSubscription from '$lib/components/admin/dashboard/tableSubscription.svelte';

	export let data: PageData;

	console.log('data', data);

	let selectedComponent = 'users';

	function selectComponent(component: string) {
		selectedComponent = component;
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-8">
	<div class="mb-10 col-auto px-3 flex-col lg:flex-row lg:gap-3">
		<button
			class="lg:my-3 px-3 btn {selectedComponent === 'users'
				? 'variant-filled-primary'
				: 'variant-outline-primary'} w-1/4 text-xs lg:w-full"
			on:click={() => selectComponent('users')}>Users</button
		>
		<button
			class="lg:my-3 px-3 btn {selectedComponent === 'session'
				? 'variant-filled-primary'
				: 'variant-outline-primary'} w-1/4 text-xs lg:w-full"
			on:click={() => selectComponent('session')}>Sessions</button
		>
		<button
			class="lg:my-3 px-3 btn {selectedComponent === 'subscription'
				? 'variant-filled-primary'
				: 'variant-outline-primary'} w-1/4 text-xs  lg:w-full"
			on:click={() => selectComponent('subscription')}>Subscriptions</button
		>
		<button
			class="lg:my-3 px-3 btn {selectedComponent === 'history'
				? 'variant-filled-primary'
				: 'variant-outline-primary'} w-1/4 text-xs inline-block lg:w-full"
			on:click={() => selectComponent('history')}>History</button
		>
		<button
			class="lg:my-3 px-3 btn {selectedComponent === 'pricing'
				? 'variant-filled-primary'
				: 'variant-outline-primary'} w-1/4 text-xs lg:w-full"
			on:click={() => selectComponent('pricing')}>Pricing</button
		>
	</div>
	<div class="col-span-7">
		<div class="cols-span-4 grid grid-cols-2 lg:grid-cols-5 gap-4 w-full h-[200px]">
			<div class="col-span-1">
				<InfoBlock title="Currenly online" value={data.online} />
			</div>
			<div class="col-span-1">
				<InfoBlock title="New User 7 days" value={data.usersSevenDays} />
			</div>
			<div class="col-span-1">
				<InfoBlock title="New Today" value={data.usersToday} />
			</div>
			<div class="col-span-1">
				<InfoBlock title="Subscribed 7 days" value={data.subscribedSevenDays} />
			</div>
			<div class="col-span-1">
				<InfoBlock title="Generated description<br /> past 7 days" value={data.historySevenDays} />
			</div>
		</div>

		<div class="lg:p-9">
			<h1 class="h2 p-3 uppercase">{selectedComponent}</h1>
			{#if selectedComponent === 'users'}
				<TableUsers />
			{:else if selectedComponent === 'session'}
				<TableSessions />
			{:else if selectedComponent === 'history'}
				<TableHistory sessionId={data.sessionId} />
			{:else if selectedComponent === 'pricing'}
				<TablePricing />
			{:else if selectedComponent === 'subscription'}
				<TableSubscription />
			{/if}
		</div>
	</div>
</div>
