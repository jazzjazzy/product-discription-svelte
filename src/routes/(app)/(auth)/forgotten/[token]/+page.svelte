<script lang="ts">
	//import { enhance } from '$app/forms';
	import FailWarning from '$lib/components/failWarning.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	console.log('form', form?.errors);
</script>

<form method="post">
	<div class="py-10 px-4 flex justify-center">
		<card-main class="flex justify-center">
			<card-header>
				<h1 class="h2 md:h1">Reset password</h1>
			</card-header>
			<card-body>
				<p class="pb-3 md:pb-0">Enter your email address and we'll send you a link to reset your password.</p>
				<label for="password" class="label text-sm md:text-xl mt-0 md:mt-6">New Password</label>
				<input
					class="input variant-form-material p-1 md:p-6"
					type="password"
					name="password"
					id="Password"
				/><br />
				{#if form?.errors?.password}
					<FailWarning errorMessage={form?.errors?.password} />
				{/if}
				<label for="confirmPassword" class="mt-3 md:mb-0 label text-sm md:text-xl mt-0 md:mt-6"
					>Confirm New Password</label
				>
				<input
					class="input variant-form-material p-1 md:p-6"
					type="password"
					name="confirmPassword"
					id="confirmPassword"
				/><br />
				{#if form?.errors?.confirmPassword}
					<FailWarning errorMessage={form?.errors?.confirmPassword} />
				{/if}
			</card-body>
			<card-footer>
				<button type="submit" class="btn-lg variant-filled-primary border">Reset</button>
			</card-footer>
		</card-main>
	</div>
</form>
