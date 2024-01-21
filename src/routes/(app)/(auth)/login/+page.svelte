<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	export let form;
	export let error;

	let loginForm: HTMLFormElement;

	let title = data?.userId === null ? 'Login' : 'Logout';

	function cancelAndRedirectForm() {
		loginForm.reset();
		history.back();
	}
</script>

<div class="flex justify-center">
	<card-main class="w-full md:w-1/2">
		<card-header>
			<h1>{title}</h1>
		</card-header>

		{#if data?.userId == null}
			<form method="post" action="?/signin" bind:this={loginForm}>
				<card-body>
					<div class="px-2 md:px-10">
						<label class="label text-xl py-1">
							<span>Email</span>
							<input
								class="input variant-form-material p-1 md:p-6"
								type="email"
								name="email"
								value={form?.email || ''}
								placeholder="email"
							/>
						</label>
					</div>
					<div class="px-2 md:px-10 mt-0 md:mt-6">
						<label class="label text-xl py-0 md:py-8">
							<span>Password</span>
							<input
								class="input variant-form-material p-1 md:p-6"
								type="password"
								name="password"
								id="id"
								placeholder="password"
							/>
							<a href="/forgotten" class="text-xs text-slate-400">forgotten password?</a>
						</label>
					</div>
					{#if form?.message}
						<p class="p-3 input-error warning">
							Invalid user email or password, please confirm and try again
						</p>
					{/if}
					{#if data?.error}
						<p class="p-3 input-error warning">{data?.error}</p>
					{/if}
					<div class="h4 flex justify-center text-orange-300 hover:text-orange-600">
						<a href="/signup">Don't have an account Sign up here</a>
					</div>
					<div class="grid grid-cols-11 mt-5">
						<div class="col-span-5 py-3">
							<hr />
						</div>
						<div class="col-span-1 text-center">Or</div>
						<div class="col-span-5 py-3">
							<hr />
						</div>
					</div>
					<div class="flex justify-center">
						<div class="w-1/2 ml-6">
							<a href="/login/google">
								<div
									class="border border-green-900 rounded-sm shadow-lg m-3 flex justify-items-center"
								>
									<div class="flex inline-flex bg-green-900 w-[4.1rem] justify-center">
										<Icon icon="fa:google" class=" m-3 text text-white text-[35px]" />
									</div>
									<div
										class="mx-4 text-xs sm:text-sm md:text-md lg:text-lg font-extrabold inline-block align-baseline my-auto"
									>
										Login with Google
									</div>
								</div>
							</a>
						</div>
						<div class="w-1/2 mr-6">
							<a href="/login/facebook">
								<div
									class="border border-slate-800 rounded-sm shadow-lg m-3 flex justify-items-center"
								>
									<div class="flex inline-flex bg-slate-800 w-[4.1rem] justify-center">
										<Icon icon="fa:facebook" class="m-3 text text-white text-[35px]" />
									</div>
									<div
										class="mx-4 text-xs sm:text-sm md:text-md lg:text-lg font-extrabold inline-block align-baseline my-auto"
									>
										Login with Facebook
									</div>
								</div>
							</a>
						</div>
					</div>
				</card-body>
				<card-footer>
					<div class="grid grid-cols-1">
						<div class="col-span-1 flex justify-end gap-3">
							<button
								type="button"
								on:click={cancelAndRedirectForm}
								class="btn md:btn-lg variant-outline-primary border">Cancel</button
							>
							<button type="submit" class="btn md:btn-lg variant-filled-primary border"
								>Log-in</button
							>
						</div>
					</div>
				</card-footer>
			</form>
		{:else}
			<card-body>
				<form method="post" action="?/signout">
					<button type="submit" class="btn md:btn-lg variant-filled-primary border">logout</button>
				</form>
			</card-body>
		{/if}
	</card-main>
</div>
