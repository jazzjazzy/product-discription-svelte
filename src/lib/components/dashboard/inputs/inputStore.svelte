<script lang="ts">
	import Icon from '@iconify/svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import Dialog from '$lib/components/dialog.svelte';

	export let storeDescription = '';
	export let sessionId: string;
	export let plan: string;

	let isSaveDialogOpen = false;
	let isSelectDialogOpen = false;
	let title = '';
	let saveError: string[] = [];
	let saveErrorMessage: string = '';
	let tableSimple: TableSource = {
		head: ['title', 'description', 'create'],
		body: [],
		meta: [],
		foot: []
	};

	async function openSaveDialog() {
		isSaveDialogOpen = true;
	}

	function closeSaveDialog() {
		isSaveDialogOpen = false;
	}

	async function openSelectDialog() {
		isSelectDialogOpen = true;
		try {
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
		const response = await getShopDescriptions();
		let descriptionList = response.user;

		tableSimple = {
			...tableSimple,
			body: tableMapperValues(descriptionList, ['title', 'description', 'created_at']),
			meta: tableMapperValues(descriptionList, [
				'id',
				'user_id',
				'title',
				'description',
				'created_at'
			]),
			foot: ['Total', '', `<code class="code">${response.message}</code>`]
		};
	}

	function closeSelectDialog() {
		isSelectDialogOpen = false;
	}

	const popupShopInfo: PopupSettings = {
		event: 'click',
		target: 'popupShopInfo',
		placement: 'bottom'
	};

	async function getShopDescriptions() {
		const response = await fetch('/api/listDesc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: sessionId
			})
		});

		const { body } = await response.json();
		return body;
	}

	async function saveDesc() {
		saveErrorMessage = '';
		if (title === '') {
			saveError.push('Please give a title to your description');
		}
		if (storeDescription === '') {
			saveError.push('Do not enter a blank description');
		}

		if (saveError.length > 0) {
			saveErrorMessage = saveError.join('<br />');
			return;
		}

		await fetch('/api/saveDesc', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: sessionId,
				title,
				description: storeDescription
			})
		});

		closeSaveDialog();
	}

	async function clicklink(event: { detail: any[] }) {
		storeDescription = event.detail[3]; //third column should be the description column in tableSimple.meta array
		closeSelectDialog(); //close the dialog
	}
</script>

<div class="card p-3">
	<div class="card-header pt-0 px-0">
		<h3 class="pl-3 pb-2 font-semibold text-lg">
			Shop Description
			<span class="w-2 cursor-pointer" use:popup={popupShopInfo}>
				<Icon icon="octicon:info-24" class="inline" />
			</span>
			<div class="arrow card p-4 w-72 shadow-xl" data-popup="popupShopInfo">
				<div class="py-3"><h4>Discribe your shop</h4></div>
				<div class="text-sm">
					Provide a detailed description of what your shop offers, including the types of products
					available. The more information you include, the better we can tailor the description to
					appeal to your target audience. Be sure to mention unique aspects that aren't immediately
					apparent just by looking at the products.
				</div>
			</div>
		</h3>
	</div>
	<div class="card-body">
		<textarea
			bind:value={storeDescription}
			placeholder="Discribe your shop and what you sell here..."
			class="w-full h-36 p-1 bg-gray-200 border-gray-300 focus:border-gray-400 focus:outline-0 focus:ring-1 rounded-xl"
		/>
		{#if plan === 'Pro' || plan === 'Ultra'}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
				<button class="col-span-1 btn variant-filled-surface" on:click={openSelectDialog}
					>Select other store discription</button
				>
				<button class="col-span-1 btn variant-filled-error" on:click={openSaveDialog}
					>Save this store discription</button
				>
			</div>
		{/if}
	</div>

	{#if plan === 'Pro' || plan === 'Ultra'}
		<Dialog isOpen={isSaveDialogOpen} onClose={closeSaveDialog}>
			<div slot="header">Save Description</div>
			<div slot="footer">
				<button on:click={saveDesc} class="col-span-1 btn variant-filled-primary ml-3"
					>save Description</button
				>
			</div>

			<div class="my-3">
				<input type="text" placeholder="Give description title here..." bind:value={title} />
			</div>
			<div class="my-3">
				<textarea
					bind:value={storeDescription}
					placeholder="Discribe your shop and what you sell here..."
					class="w-full h-36 p-1 bg-gray-200 border-gray-300 focus:border-gray-400 focus:outline-0 focus:ring-1 rounded-xl"
				/>
			</div>
			{#if saveErrorMessage}
				<div class="my-3">
					<p class="text-red-500">{@html saveErrorMessage}</p>
				</div>
			{/if}
		</Dialog>
		<Dialog isOpen={isSelectDialogOpen} onClose={closeSelectDialog}>
			<div slot="header">Select Description</div>
			<div class="h-[600px] overflow-y-auto">
				<Table interactive={true} source={tableSimple} on:selected={clicklink} />
			</div>
		</Dialog>
	{/if}
</div>

<style>
	.dialog-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dialog-content {
		width: 900px;
		//padding: 20px;
		border-radius: 10px;
		background-color: white;
	}
</style>
