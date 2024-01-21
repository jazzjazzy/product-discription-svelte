<script lang="ts">
	import type { PageData } from '../$types';
	import type { Subscription } from '$lib/types/subscription';
	import Crud from '$lib/components/CRUD/crud.svelte';

	export let data: PageData;

	let subscription: Subscription = data.session;
	let id = data.userId;

	// if string field is in this array, it will be a textarea
	const textareas = ['description', 'list'];
	const dates = ['created_at', 'updated_at', 'deleted_at'];
	const title = 'Session';
</script>

<Crud rawData={subscription} {id} {textareas} {dates} {title}/>
