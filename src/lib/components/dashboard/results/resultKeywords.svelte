<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import CopyContentToClipBoard from '$lib/components/copyContentToClipBoard.svelte';
	import { formateKeywordstring } from '$lib/helpers/Utilis';

	export let isEditable = false;
	export let divKeywords: HTMLDivElement;
	export let pageKeywords = '';
	export let clearKeywords = '';
	let keywordLength = 20;

	/**
	 * format keywords
	 *
	 * @param event
	 */
	 function checkKeywordLength(event: Event): void {
		let target = event.target as HTMLDivElement;
		let editableText = target.textContent || '';

		pageKeywords = formateKeywordstring(editableText, keywordLength);
	}
</script>

<AppBar
	padding="0"
	gridColumns="grid-cols-2"
	slotDefault="place-self-left"
	slotTrail="place-content-end"
>
	<h2 class="flex justify-start text-2xl">Keywords</h2>
	<svelte:fragment slot="trail">
		{#if isEditable}
			<CopyContentToClipBoard element="pageKeywords" />
		{/if}
	</svelte:fragment>
</AppBar>
<div
	bind:this={divKeywords}
	class="w-full p-3"
	contenteditable={isEditable}
	on:blur={checkKeywordLength}
>
	{@html pageKeywords}
</div>
<div class="hidden" data-clipboard="pageKeywords">
	{@html clearKeywords}
</div>
