<script lang="ts">
	//import { enhance } from '$app/forms';
	import FailWarning from '$lib/components/failWarning.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	console.log("form",form?.errors);
	
</script>

<form method="post">
	<div class="py-10 px-4 flex justify-center">
		<card-main class="flex justify-center">
			<card-header>
				<h1>Reset password</h1>
			</card-header>
			<card-body>
				<p>Enter your email address and we'll send you a link to reset your password.</p>
					<label for="email">New Password</label>
					<input type="password" name="password" id="Password" /><br />
					{#if form?.errors?.password}
						<FailWarning errorMessage={form?.errors?.password} />
					{/if}
					<label for="email">Confirm New Password</label>
					<input type="password" name="confirmPassword" id="confirmPassword" /><br />
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
