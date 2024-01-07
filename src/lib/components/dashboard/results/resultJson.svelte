<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import CopyContentToClipBoard from '$lib/components/copyContentToClipBoard.svelte';

	export let isEditable = true;
	export let pageJson = '';
</script>

<AppBar
	padding="0"
	gridColumns="grid-cols-2"
	slotDefault="place-self-left"
	slotTrail="place-content-end"
>
	<h2 class="flex justify-start text-2xl">Json output</h2>
	<svelte:fragment slot="trail">
		{#if isEditable}
			<CopyContentToClipBoard element="pageJson" />
		{/if}
	</svelte:fragment>
</AppBar>
<div class="w-full p-3">
	<pre id="json" data-clipboard="pageJson">{@html pageJson}</pre>
</div>
