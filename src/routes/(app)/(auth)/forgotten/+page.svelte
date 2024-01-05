<script lang="ts">
	//import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import FailWarning from '$lib/components/failWarning.svelte';
	import SuccessWarning from '$lib/components/successWarning.svelte';

	export let data: PageData;
	export let form: ActionData; 

	let errorMessage = '';
	let successMessage = '';

	if (form) {
		if (form?.message) {
			errorMessage = form?.message;
		} else {
			successMessage = 'Verification email sent successfully';
		}
	}
</script>

<form method="post">
	<div class="container py-10 px-4 flex justify-center">
		<card-main class="flex justify-center">
			<card-header>
				<h1>Send Reset</h1>
			</card-header>
			<card-body>
				<p>Enter your email address and we'll send you a link to reset your password.</p>
				<label for="email">Email</label>
				<input name="email" id="email" value={form?.email ?? ''} />
				{#if errorMessage}
					<FailWarning {errorMessage} />
				{/if}
				{#if successMessage}
					<SuccessWarning {successMessage} />
				{/if}
			</card-body>
			<card-footer>
				<button type="submit" class="btn-lg variant-filled-primary border">Send</button>
			</card-footer>
		</card-main>
	</div>
</form>
