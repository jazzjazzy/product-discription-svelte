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
	<div class="py-10 md:px-4 flex justify-center">
		<card-main class="flex justify-center">
			<card-header>
				<h1 class="h2 md:h1">Send Reset</h1>
			</card-header>
			<card-body class="py-4">
				<p class="pb-3 md:pb-0">Enter your email address and we'll send you a link to reset your password.</p>
				<label for="email" class="label text-sm md:text-xl mt-0 md:mt-6">Email</label>
				<input
					class="input variant-form-material p-1 md:p-6"
					name="email"
					id="email"
					value={form?.email ?? ''}
				/>
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
