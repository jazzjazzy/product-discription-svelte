<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { formatDateToLocal } from '$lib/helpers/Utilis';

	let tableSimple: TableSource = {
		head: [
			'image',
			'shop des',
			'product',
			'char size',
			'temp',
			'title',
			'description',
			'keywords',
			'count title',
			'count description',
			'date'
		],
		body: [],
		meta: [],
		foot: []
	};
	onMount(async () => {
		const fetchedData = data.historyList;
		const historyCount = data.historyList.length;

		tableSimple = {
			...tableSimple,
			body: tableMapperValues(fetchedData, [
				'image_location',
				'shop_description',
				'product_description',
				'charactor_size',
				'temperature',
				'generated_title',
				'generated_description',
				'generated_keywords',
				'count_title',
				'count_description',
				'created_at'
			]),
			meta: tableMapperValues(fetchedData, [
				'id',
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
				'created_at'
			]),
			foot: ['Total', '', `<code class="code">${historyCount}</code>`]
		};
	});

	export let data: PageData;

	function clicklink(event: any) {
		try {
			console.log('clicklink', event.detail[0]);
			window.location.href = '/history/' + event.detail[0];
		} catch (error) {
			console.error('Error Description script:', error);
		}
	}

	function backButton() {
		history.back();
	}
</script>

{#if data.historyRecord !== null}
	<card-main>
		<card-header>
			<h1>History Record</h1>
		</card-header>
		<card-body>
			<div class="py-3">
				<div class="grid grid-cols-4 gap-4">
					<div class="col-span-4 md:col-span-2">
						{#if data.historyRecord.image_type === 'base64'}
							<img src="/uploads/{data.historyRecord.image_location}" width="550" />
						{:else}
							<img src={data.historyRecord.image_location} width="400" />
						{/if}
					</div>
					<div class="col-span-4 md:col-span-2">
						<div>
							<label>Shop Description:</label>
							<p>{data.historyRecord.shop_description}</p>
						</div>
						<div>
							<label>Product Description:</label>
							<p>{data.historyRecord.product_description}</p>
						</div>
						<div>
							<label>store_type:</label>
							<p>{data.historyRecord.store_type}</p>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-4 w-full">
					<div class="col-span-1">
						<label>Charactor size:</label>
						{data.historyRecord.charactor_size}
					</div>
					<div class="col-span-1">
						<label>Temperature: </label>
						{data.historyRecord.temperature}
					</div>
				</div>
				<div class="grid md:grid-cols-2 py-1 mt-5 border-double border-slate-500 border-y-2">
					<span class="h2 col-span-1">Generated</span>
					<span class="col-span-1 flex justify-end py-2">
						<p>Created on {formatDateToLocal(data.historyRecord.created_at)}</p>
					</span>
				</div>
				<div>
					<div class="h3 pt-3">
						Title:
						<span class="text-sm text-slate-400 p-10">
							({data.historyRecord.count_title} charactors long)
						</span>
					</div>
					<p class="pt-2">{data.historyRecord.generated_title}</p>
				</div>
				<div>
					<div class="h3 pt-3">
						Description:<span class="text-sm text-slate-400 p-10"
							>({data.historyRecord.count_description} charactors long)</span
						>
					</div>
					<p class="pt-2">{data.historyRecord.generated_description}</p>
				</div>
				<div>
					<div class="h3 pt-3">Keywords:</div>
					<p class="pt-2">{data.historyRecord.generated_keywords}</p>
				</div>
				<div>
					<div class="h3 pt-3">Json:</div>
					<div class="pt-2 overflow-x-auto">
						<pre>{JSON.stringify(data.historyRecord.generated_json, null, 2)}</pre>
					</div>
				</div>
			</div>
		</card-body>
		<card-footer
			><button type="button" on:click={backButton} class="btn-lg variant-outline-primary border"
				>Back</button
			></card-footer
		>
	</card-main>
{:else if data.historyList !== null && data.historyList.length > 0}
	<div class="text-xs">
		<Table interactive={true} source={tableSimple} on:selected={clicklink} />
	</div>
{:else}
	<card-main>
		<card-header>
			<h1>History Record</h1>
		</card-header>
		<card-body>
			<div class="text-lg p-5 text-center font-semibold">You currently have no history</div>
		</card-body>
	</card-main>
{/if}

<style>
	label {
		@apply h4 py-2 font-semibold;
	}
</style>
