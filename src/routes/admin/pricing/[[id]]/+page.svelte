<script lang="ts">
	import type { PageData } from '../$types';
	import type { Pricing } from '$lib/types/subscription';
	import Crud from '$lib/components/CRUD/crud.svelte';

	export let data: PageData;

	let price: Pricing = data.price;
	let id = data.userId;

	// if string field is in this array, it will be a textarea
	const textareas = ['description', 'list'];
	const dates = ['created_at', 'updated_at', 'deleted_at'];
	const title = 'Pricing';
</script>

<Crud rawData={price} {id} {textareas} {dates} {title}/>
