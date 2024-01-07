<script lang="ts">
	import type { PageData } from '../$types';
	import Crud from '$lib/components/CRUD/crud.svelte';

	export let data: PageData;

	let history = data.history;
	let id = history.userId;

	// if string field is in this array, it will be a textarea
	const textareas = [`image_description`, `shop_description`, `product_description`, 'generated_title',   `generated_description` , `generated_keywords` ];
	const dates = ['created_at', 'updated_at', 'deleted_at'];
	const jsonStr = ['generated_json'];
	const title = 'History';
</script>

<Crud rawData={history} {jsonStr} {id} {textareas} {dates} {title}/>
