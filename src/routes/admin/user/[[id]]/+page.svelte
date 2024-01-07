<script lang="ts">
	import type { PageData } from '../$types';
	import type { User } from '$lib/types/user';
	import Crud from '$lib/components/CRUD/crud.svelte';

	export let data: PageData;

	let user: User = data.user;
	let id = data.userId;

	// if string field is in this array, it will be a textarea
	const textareas = ['description', 'list'];
	const dates = ['created_at', 'updated_at', 'deleted_at'];
	const title = 'User';
</script>

<Crud rawData={user} {id} {textareas} {dates} {title} />
