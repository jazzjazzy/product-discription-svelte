<!-- in src/routes/checkout/payment/+page.svelte -->
<script lang="ts">
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { Elements, PaymentElement } from 'svelte-stripe';

	// data from server
	export let data;

	// destructure server data
	$: ({ clientSecret, returnUrl } = data);

	// Stripe instance
	let stripe: Stripe;

	// Stripe Elements instance
	let elements: StripeElements;


	// when component mounts
	onMount(async () => {
		// load the Stripe client
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});

	// handle form submission
	async function submit() {
		// ask Stripe to confirm the payment
		const { error } = await stripe.confirmSetup({
			// pass instance that was used to create the Payment Element
			elements,

			// specify where to send the user when payment succeeeds
			confirmParams: {
				return_url: returnUrl
			}
		});

		if (error) {
			// handle error
			console.error(error);
		}
	}
</script>

<form on:submit|preventDefault={submit}>
	<div class="flex justify-center w-full">
		<card-main class="w-3/5">
			<card-header><h1>Payment</h1></card-header>
			<card-body class="py-5">
				{#if stripe}
					<!-- container for Stripe components -->
					<Elements {stripe} {clientSecret} bind:elements>
						<!-- display payment related fields -->
						<PaymentElement />
					</Elements>
				{:else}
					Loading Stripe...
				{/if}
			</card-body>
			<card-footer>
				<button class="btn variant-filled-secondary">Make Payment</button>
			</card-footer>
		</card-main>
	</div>
</form>
