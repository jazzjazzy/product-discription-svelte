<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import CopyContentToClipBoard from '$lib/components/copyContentToClipBoard.svelte';

	export let isEditable = false;
	export let divTitle: HTMLDivElement;
	export let pageTitle = '';
	export let pageTitleCount = 0;

	/**
	 * Count characters on editable div for Title and Description
	 * This is the live count if a user is editing the text
	 *
	 * @param event
	 */
	function recountTitleLength(event: Event): void {
		const target = event.target as HTMLDivElement;
		let title = target.textContent || '';
		pageTitleCount = title.length;
	}
</script>

<AppBar
	padding="0"
	gridColumns="grid-cols-2"
	slotDefault="place-self-left"
	slotTrail="place-content-end"
>
	<h2 class="flex justify-start text-2xl">Title</h2>
	<svelte:fragment slot="trail">
		{#if isEditable}
			<CopyContentToClipBoard element="pageTitle" />
		{/if}
	</svelte:fragment>
</AppBar>
<h1>
	<div
		bind:this={divTitle}
		class="w-full p-3"
		contenteditable={isEditable}
		on:input={recountTitleLength}
		data-type="title"
		data-clipboard="pageTitle"
	>
		{@html pageTitle}
	</div>
</h1>
<div class="text-xs float-right text-red-500">
	{#if pageTitleCount > 0}
		{pageTitleCount}
	{/if}
</div>
