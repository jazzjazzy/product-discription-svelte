<script lang="ts">
	import type { loginSession } from '$lib/types/user';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import MenuFull from '$lib/components/nav/menu/menu-full.svelte';
	import MenuDropdown from '$lib/components/nav/menu/menu-dropdown.svelte';

	export let data: loginSession;

	let adminGod = false;
	let showMenu = false;

	//
	if (data.role === 'ADMIN' || data.role === 'GOD') {
		adminGod = true;
	}

	// Handle window resize to close mobile menu on larger screens
	onMount(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth > 768) {
				// Adjust this value based on your design
				showMenu = false;
			}
		});
	});
</script>

<nav>
	<div class="grid grid-cols-6 md:grid-cols-12 border-2 mb-4 bg-white relative">
		<div class="col-span-1 md:col-span-5 flex place-content-start p-0">
			<div class="hidden lg:block">
				<MenuFull {data} {adminGod} />
			</div>
			<div class="block lg:hidden">
				<MenuDropdown {data} {adminGod} {showMenu} />
			</div>
		</div>
		<div
			class="col-span-3 md:col-span-2 text-xl md:text-3xl xl:text-5xl text-center md:m-auto align-middle font-semibold"
		>
			<a href="/">Dis<span class="text-3xl md:text-5xl lg:text-7xl line- text-red-500">.</span>scription</a>
		</div>
		<div class="col-span-2 md:col-span-5 flex place-content-end p-4">
			<div class="font-sans flex">
				{#if data.userId == null}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-1">
						<div class="col-span-1">
							<a href="/login">
								<div class="text-xs btn-xs sm:btn-sm md:btn-md lg:btn-lg p-1 text-center variant-filled">
									Login
								</div>
							</a>
						</div>
						<div class="col-span-1">
							<a href="/signup"
								><div class="text-xs btn-xs sm:btn-sm md:btn-md lg:btn-lg p-1 text-center variant-filled">
									Signup
								</div></a
							>
						</div>
					</div>
				{:else}
					<div class="grid grid-cols-1 lg:grid-cols-8 gap-1">
						<div class="col-span-4 pr-2 text-right hidden lg:block">
							<div class="text-sm">{data.name}</div>
							<div class="text-xs">{data.email}</div>
							{#if data.subscribed == true}
								<div class="text-xs">Account: {data.plan}</div>
							{/if}
						</div>
						<div class="col-span-1 lg:col-span-2 md:text-right">
							<form method="post" action="/login?/signout">
								<button type="submit" class="btn-xs sm:btn-sm md:btn-md lg:btn-lg p-1 variant-filled"
									>Logout</button
								>
							</form>
						</div>
						<div class="col-span-1 lg:col-span-2">
							<a href="/profile"
								><div class="btn-xs sm:btn-sm md:btn-md lg:btn-lg p-1 variant-filled">Profile</div></a
							>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>

<style>
	li {
		@apply w-full bg-white;
	}

	li :hover {
		@apply bg-gray-100 px-4 py-2;
	}
</style>
