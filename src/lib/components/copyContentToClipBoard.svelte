<script lang="ts">
	/**
	 * @module copyContentToClipBoard
	 *
	 * @description
	 * This component is used to copy content to the clipboard.
	 *
	 * @props element: string - the div that we a copying from, should match data-clipboard value
	 */
	import { clipboard } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	/**
	 * @param {string} element
	 */
	export let element: string;

	let canCopying: boolean = true;

	async function handelCopy() {
		canCopying = false;
		setTimeout(() => {
			canCopying = true;
		}, 2000);
	}
</script>

{#if canCopying}
	<div>
		<button use:clipboard={{ element: element }} on:click={() => handelCopy()}>
			<Icon icon="ph:clipboard-text-fill" class="text-2xl" />
		</button>
	</div>
{:else}
	<div>
		<Icon icon="heroicons-solid:thumb-up" class="text-2xl text-amber-500" />
	</div>
{/if}

<style>
</style>
