<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Icon from '@iconify/svelte';

	export let data;
	export let adminGod = false;
	export let showMenu = false;

	function closeMenu() {
		showMenu = false;
	}

	// Click handler for links
	function handleLinkClick(event: MouseEvent) {
		closeMenu();
	}

	// Detect all clicks on the page to close the dropdown menu
	onMount(() => {
		const handleClickOutside = (event) => {
			const menuToggle = document.getElementById('menu-toggle');
			const menu = document.getElementById('menu');
			if (
				menuToggle &&
				menu &&
				!menuToggle.contains(event.target) &&
				!menu.contains(event.target)
			) {
				closeMenu();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			// Cleanup the event listener when the component is destroyed
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="block lg:hidden relative">
	<div class="flex justify-center items-center">
		<button
			id="menu-toggle"
			class="text-2xl text-black hover:text-black focus:outline-none"
			on:click={() => (showMenu = !showMenu)}
		>
			<Icon icon="pajamas:hamburger" class="p-0 m-3" />
		</button>
	</div>
	{#if showMenu}
		<div class="absolute left-0 -mt-1 bg-white border rounded shadow z-10">
			<div
				class={`w-1/2 block flex-grow lg:flex lg:items-center lg:w-auto ${
					showMenu ? 'block' : 'hidden'
				}`}
				id="menu"
			>
				<div class=" flex place-content-start px-0 md:block">
					<div class="font-sans">
						<ui class="lg:block">
							<li class="border-b-2 w-full border-b-white hover:border-b-orange-500">
								<a href="/" on:click={handleLinkClick}><div class="text-2xl">Home</div></a>
							</li>
							{#if data.plan === 'Pro' || data.plan === 'Ultra' || adminGod}
								<!-- show history if user is subscribed or admin -->
								<li class="border-b-2 w-full border-b-white hover:border-b-orange-500">
									<a href="/faq" on:click={handleLinkClick}><div class="text-2xl">FAQ</div></a>
								</li>
								<li class="border-b-2 w-full border-b-white hover:border-b-orange-500">
									<a href="/history" on:click={handleLinkClick}
										><div class="text-2xl">History</div></a
									>
								</li>
							{/if}
							<li class="border-b-2 w-full border-b-white hover:border-b-orange-500">
								<a href="/pricing" on:click={handleLinkClick}><div class="text-2xl">Pricing</div></a
								>
							</li>
							<div class="border-b-2 w-full border-b-white hover:border-b-orange-500">
								<a
									href="/dashboard"
									on:click={handleLinkClick}
									class="btn variant-ghost-primary rounded-md m-0"
									><div class="text-2xl">Generate</div></a
								>
							</div>
							{#if adminGod}
								<li class="border-b-2 w-full border-b-white hover:border-b-orange-500">
									<a href="/admin" on:click={handleLinkClick}><div class="text-2xl">Admin</div></a>
								</li>
							{/if}
						</ui>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	li {
		list-style-type: none;
		padding: 0.5rem;
	}
</style>
