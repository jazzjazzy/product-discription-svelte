<script lang="ts">
	import type { PageData } from '../$types';
	import type { Pricing } from '$lib/types/subscription';
	import Crud from '$lib/components/CRUD/crud.svelte';

	export let data: PageData;

	let session: Pricing = data.session;
	let id = data.userId;

	// if string field is in this array, it will be a textarea
	const textareas = ['description', 'list'];
	const dates = ['created_at', 'updated_at', 'deleted_at'];
	const title = 'Session';
</script>

<Crud rawData={session} {id} {textareas} {dates} {title}/>
