<!-- Dialog.svelte -->
<script>
	export let isOpen = false;
	export let onClose = () => {};
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog-backdrop" on:click={onClose}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="dialog-content" on:click|stopPropagation>
			<card-main>
				<card-header>
					<h1><slot name="header" /></h1>
				</card-header>
				<card-body>
					<slot />
				</card-body>
				<card-footer>
						<button class="btn variant-outline-primary border" on:click={onClose}>Close</button>
						<slot name="footer" />
				</card-footer>
			</card-main>
		</div>
	</div>
{/if}

<style>
	.dialog-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dialog-content {
		width: 900px;
		//padding: 20px;
		border-radius: 10px;
		background-color: white;
	}
</style>
