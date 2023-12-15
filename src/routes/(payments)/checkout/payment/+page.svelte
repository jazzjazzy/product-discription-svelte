<!-- in src/routes/checkout/payment/+page.svelte -->
<script lang="ts">
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { Elements, PaymentElement} from 'svelte-stripe';

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
		const { error } = await stripe.confirmPayment({
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

<div class="flex flex-col">
	<h1 class="w-full">Payment</h1>
	<div class="w-full">
		{#if stripe}
			<form on:submit|preventDefault={submit}>
				<!-- container for Stripe components -->
				<Elements {stripe} {clientSecret} bind:elements>
					<!-- display payment related fields -->
					<PaymentElement />
				</Elements>

				<button>Pay</button>
			</form>
		{:else}
			Loading Stripe...
		{/if}
	</div>
</div>
