<script lang="ts">
	import type { PageData } from './$types';
	import type { Pricing } from '$lib/types/subscription';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	let prices: Pricing[] | undefined = data.prices;
	let currSubscription: String | null | undefined = data.currSubscription;
	let loggedIn: Boolean = !!data.userId;

	// set minumum columns to 1
	let columns = 1;
	// if there are more than 1 price, set columns to the number of prices
	if (!!prices && prices.length > 1) {
		columns = prices.length;
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-{columns} gap-5">
	{#if !!prices}
		{#each prices as price}
			<div class="col-span-1 border border-spacing-5">
				<card-main class:active={currSubscription == price.name}>
					<card-header>
						<h1 class="text-xl md:text-2xl lg:text-4xl w-full">{price.name}</h1>
						<h3 class="flex justify-center text-3xl sm:text-5-xl lg:text-6xl w-full pl-6">
							<div><span class="pr-2">${price.price}</span><span class="text-lg pl-0">a month</span></div>
						</h3>
					</card-header>
					<card-body>
						<div class="py-3">{price.description}</div>
						{#each JSON.parse(price.list) as listItem}
							<div class="py-3 font-bold">
								<div>
									<Icon icon="heroicons-solid:thumb-up" class="inline" /><span
										class="pl-2 h-full text-center">{listItem}</span
									>
								</div>
							</div>
						{/each}
					</card-body>
					<card-footer class="flex justify-center">
						<!-- user is loggined in a has a subscription already -->
						{#if currSubscription && loggedIn}
							{#if currSubscription == price.name}
								<!-- show users current  -->
								<div class=" border-4 border-x-orange-500 text-primary-900 p-3 rounded-lg">
									Current Subscription
								</div>
							{:else}
								<!-- show upgrade/downgrade option  -->
								<a
									data-sveltekit-reload
									href="/checkout/payment?subtype={currSubscription.toLocaleLowerCase()}&update={price.name}"
									class="btn variant-ringed-primary rounded-lg">Change to {price.name}</a
								>
							{/if}
						{:else if !loggedIn}
							<!--if not signed in get user to registor-->
							<a href="/regisitor" class="btn variant-ringed-primary rounded-lg">Register</a>
						{:else}
							<!--if signed in and no subscription allow to purchase -->
							<a
								data-sveltekit-reload
								href="/checkout/payment?subtype={price.name.toLocaleLowerCase()}"
								class="btn variant-ringed-primary rounded-lg">Purchase {price.name}</a
							>
						{/if}
					</card-footer>
				</card-main>
			</div>
		{/each}
	{:else}
		<card-main class="inline-block">
			<card-header>
				<h1 class="text-3xl inline-grid">No prices found</h1>
			</card-header>
			<card-body>There are no prices for this product.</card-body>
		</card-main>
	{/if}
</div>

<style>
	.active {
		border: 4px solid rgb(177, 144, 95);
		box-shadow: 10px 10px 10px 10px rgba(126, 115, 115, 0.25);
	}
</style>
