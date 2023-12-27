<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form;

	let loginForm: HTMLFormElement;

	function cancelAndRedirectForm() {
		loginForm.reset();
		history.back();
	}
</script>

<div class="container flex justify-center">
	<card-main class="w-1/2">
		<card-header>
			<h1>Loggin</h1>
		</card-header>

		{#if data?.userId == null}
			<form method="post" action="?/signin" bind:this={loginForm}>
				<card-body>
					<div class="px-10">
						<label class="label text-xl py-1">
							<span>Email</span>
							<input
								class="input variant-form-material p-6"
								type="email"
								name="email"
								value={form?.email || ''}
								placeholder="email"
							/>
						</label>
					</div>
					<div class="px-10">
						<label class="label text-xl py-8">
							<span>Password</span>
							<input
								class="input variant-form-material p-6"
								type="password"
								name="password"
								id="id"
								placeholder="password"
							/>
						</label>
					</div>
					{#if form?.message}
						<p class="p-3 input-error warning">
							Invalid user email or password, please confirm and try again
						</p>
					{/if}
				</card-body>
				<card-footer class="px-0">
					<div class="grid grid-cols-2 px-10">
						<div class="col-span-1">
							<a href="/login/google">Sign in with google</a><br />
							<a href="/login/facebook">Sign in with facebook</a>
						</div>
						<div class="col-span-1 flex justify-end">
							<button type="submit" class="btn-lg variant-filled-primary border">Log-in</button>
							<button
								type="button"
								on:click={cancelAndRedirectForm}
								class="btn-lg variant-outline-primary border">Cancel</button
							>
						</div>
					</div>
				</card-footer>
			</form>
		{:else}
			<form method="post" action="?/signout">
				<button type="submit" class="border">logout</button>
			</form>
		{/if}
	</card-main>
</div>
