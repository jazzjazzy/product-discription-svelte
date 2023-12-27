<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: any;

	let regform: HTMLFormElement;

	function cancelAndRedirectForm() {
		regform.reset();
		history.back();
	}
</script>

<div class="container flex justify-center">
	<card-main class="w-1/2">
		<card-header>
			<h1 class="text-left text-4xl">Register</h1>
		</card-header>

		{#if data?.userId == null}
			<form method="post" bind:this={regform}>
				<card-body>
					<div class="px-10 grid grid-cols-2 gap-3">
						<div class="col-span-1">
							<label class="label text-xl py-8">
								<span>Name</span>
								<input
									class="input variant-form-material p-6"
									type="text"
									name="firstname"
									value={form?.firstname || ''}
									placeholder="Name"
								/>
							</label>
							{#if form?.errors?.firstname}
								<span class="text-xs variant-ghost-error px-2 py1"
									>{@html form?.errors?.firstname[0]}</span
								>
							{/if}
						</div>
						<div class="col-span-1">
							<label class="label text-xl py-8">
								<span>Surname</span>
								<input
									class="input variant-form-material p-6"
									type="text"
									name="surname"
									value={form?.surname || ''}
									placeholder="Surname"
								/>
							</label>
							{#if form?.errors?.surname}
								<span class="text-xs variant-ghost-error px-2 py1"
									>{@html form?.errors?.surname[0]}</span
								>
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
								value={form?.email || ''}
								placeholder="email"
							/>
						</label>
						{#if form?.errors?.email}
							<span class="text-xs variant-ghost-error px-2 py1"
								>{@html form?.errors?.email[0]}</span
							>
						{/if}
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
						{#if form?.errors?.password}
							<span class="text-xs variant-ghost-error px-2 py1"
								>{@html form?.errors?.password[0]}</span
							>
						{/if}
					</div>
					<div class="px-10">
						<label class="label text-xl py-8">
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
							<span class="text-xs variant-ghost-error px-2 py1"
								>{@html form?.errors?.confirmPassword[0]}</span
							>
						{/if}
					</div>
					{#if form?.message}
						<p class="p-3 input-error warning">
							Invalid user email or password, please confirm and try again
						</p>
					{/if}
				</card-body>
				<card-footer>
					<div class="grid grid-cols-2 px-10">
						<div class="col-span-1" />
						<div class="col-span-1 flex justify-end">
							<button type="submit" class="btn-lg variant-filled-primary border">Register</button>
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
