<script lang="ts">
	import FailWarning from '$lib/components/failWarning.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let regform: HTMLFormElement;

	console.log('form', form);

	function cancelAndRedirectForm() {
		regform.reset();
		history.back();
	}
</script>

<div class="container flex justify-center">
	<card-main class="w-1/2">
		<card-header>
			<h1 class="text-left text-4xl">Sign up</h1>
		</card-header>
		{#if data?.userId == null}
			<form method="post" bind:this={regform}>
				<card-body>
					<div class="px-10 py-4 grid grid-cols-2 gap-3">
						<div class="col-span-1">
							<label class="label text-xl">
								<span>Name</span>
								<input
									class="input variant-form-material p-6"
									type="text"
									name="firstname"
									value={form?.data.firstname || ''}
									placeholder="Name"

								/>
							</label>
							{#if form?.errors?.firstname}
								<FailWarning errorMessage={form?.errors?.firstname[0]} />
							{/if}
						</div>
						<div class="col-span-1">
							<label class="label text-xl">
								<span>Surname</span>
								<input
									class="input variant-form-material p-6"
									type="text"
									name="surname"
									value={form?.data.surname || ''}
									placeholder="Surname"
								/>
							</label>
							{#if form?.errors?.surname}
								<FailWarning errorMessage={form?.errors?.surname[0]} />
							{/if}
						</div>
					</div>
					<div class="px-10">
						<label class="label text-xl py-1">
							<span>Email</span>
							<input
								class="input variant-form-material p-6"
								type="email"
								name="email"
								value={form?.data.email || ''}
								placeholder="email"
							/>
						</label>
						{#if form?.errors?.email}
							<FailWarning errorMessage={form?.errors?.email[0]} />
						{/if}
					</div>
					<div class="px-10 pt-4">
						<label class="label text-xl">
							<span>Password</span>
							<input
								class="input variant-form-material p-6"
								type="password"
								name="password"
								id="id"
								placeholder="password"
							/>
							
						</label>
						{#if form?.errors?.password}
								<FailWarning errorMessage={form?.errors?.password[0]} />
						{/if}
					</div>
					<div class="px-10 py-4">
						<label class="label text-xl">
							<span>Confirm Password</span>
							<input
								class="input variant-form-material p-6"
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								placeholder="confirm password"
								required
							/>
						</label>
						{#if form?.errors?.confirmPassword}
								<FailWarning errorMessage={form?.errors?.confirmPassword[0]} />
						{/if}
					</div>
					<div class="h4 flex justify-center text-orange-300 hover:text-orange-600 pt-4">
						<a href="/login">I have an account Sign in here</a>
					</div>
				</card-body>
				<card-footer>
					<div class="grid grid-cols-1">
						<div class="col-span-1 flex justify-end gap-3">
							<button
								type="button"
								on:click={cancelAndRedirectForm}
								class="btn-lg variant-outline-primary border">Cancel</button
							>
							<button type="submit" class="btn-lg variant-filled-primary border">Register</button>
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
