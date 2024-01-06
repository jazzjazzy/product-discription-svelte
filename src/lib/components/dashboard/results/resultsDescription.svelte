<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import CopyContentToClipBoard from '$lib/components/copyContentToClipBoard.svelte';

	export let isEditable = false;
	export let divDescription: HTMLDivElement;
	export let pageDescription = '';
	export let pageDescriptionCount = 0;

	/**
	 * Count characters on editable div for Title and Description
	 * This is the live count if a user is editing the text
	 *
	 * @param event
	 */
	function recountDescriptionLength(event: Event): void {
		const target = event.target as HTMLDivElement;
		let description = target.textContent || '';
		pageDescriptionCount = description.length;
	}

	/**
	 * replace new line with break
	 * @param text
	 */
	function newlineToBreak(text: string) {
		return text.replace(/\n/g, '<br>');
	}
</script>

<AppBar
	padding="0"
	gridColumns="grid-cols-2"
	slotDefault="place-self-left"
	slotTrail="place-content-end"
>
	<h2 class="flex justify-start text-2xl">Description</h2>
	<svelte:fragment slot="trail">
		{#if isEditable}
			<CopyContentToClipBoard element="pageDescription" />
		{/if}
	</svelte:fragment>
</AppBar>
<div
	bind:this={divDescription}
	class="w-full p-3"
	contenteditable={isEditable}
	on:input={recountDescriptionLength}
	data-type="description"
	data-clipboard="pageDescription"
>
	{@html newlineToBreak(pageDescription)}
</div>
<div class="text-xs float-right text-red-500">
	{#if pageDescriptionCount > 0}
		{@html pageDescriptionCount}
	{/if}
</div>
