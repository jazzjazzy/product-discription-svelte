<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import type { User } from '$lib/types/user';

	export let data: PageData;
	export let form;

	let errorMessage: string = '';
	let user = data.user;
	let accountType: string = '';

	if (!user) {
		errorMessage = 'User not found';
	} else {
		if (user.key === undefined) {
			errorMessage = 'User key not found';
		} else {
			let keyId = user.key[0].id;
			let keyIdArray = keyId.split(':');
			accountType = keyIdArray[0];
		}
	}

	let passwordForm: HTMLFormElement;
	let updateUserForm: HTMLFormElement;

	function submitPassword() {
		passwordForm.submit();
	}

	function updateUser() {
		updateUserForm.submit();
	}
</script>

{#if errorMessage}
	<p class="error">{errorMessage}</p>
{/if}
<div class="py-10 md:px-4 flex justify-center">
	<div class="w-full md:w-2/3 grid gap-7">
		<card-main>
			<card-header>
				<h3>Profile</h3>
			</card-header>
			<card-body>
				<form method="post" action="?/updateUser" bind:this={updateUserForm}>
					<div>
						<label for="firstname">First name</label>
						<div>
							<input
								class="w-full input variant-form-material p-1 md:p-6"
								type="text"
								name="firstname"
								value={user.firstname}
							/>
						</div>
					</div>
					<div>
						<label for="surname">Surname</label>
						<div>
							<input
								class="w-full input variant-form-material p-1 md:p-6"
								type="text"
								name="surname"
								value={user.surname}
							/>
						</div>
					</div>
					{#if accountType === 'email'}
						<div>
							<label for="email">Email</label>
							<div>
								<input
									class="w-full input variant-form-material p-1 md:p-6"
									type="email"
									name="email"
									value={user.email}
								/>
							</div>
						</div>
					{/if}
				</form>
			</card-body>
			<card-footer>
				<button class="btn variant-filled-secondary" on:click={updateUser}> Upate Profile </button>
			</card-footer>
		</card-main>
		{#if accountType === 'email'}
			<card-main>
				<card-header>
					<h3>Change Password</h3>
				</card-header>
				<card-body>
					{#if form && form.status == 411}
						<div role="alert">
							<div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">Error Message</div>
							<div
								class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
							>
								<p>{form.body?.error}</p>
							</div>
						</div>
					{/if}
					<form method="post" action="?/changePassword" bind:this={passwordForm}>
						<div>
							<label for="oldpassword">Current Password</label>
							<div class="w-full">
								<input
									class="w-full input variant-form-material p-1 md:p-6"
									type="password"
									name="oldpassword"
								/>
							</div>
						</div>
						<div>
							<label for="newpassword">New Password</label>
							<div>
								<input
									class="w-full input variant-form-material p-1 md:p-6"
									type="password"
									name="newpassword"
								/>
							</div>
						</div>
						<div>
							<label for="confirmpassword">Confirm Password</label>
							<div>
								<input 
								class="w-full input variant-form-material p-1 md:p-6"
								type="password" 
								name="confirmpassword" 
								 /></div>
						</div>
					</form>
				</card-body>
				<card-footer>
					<button class="btn variant-filled-secondary" on:click={submitPassword}>
						Change Password
					</button>
				</card-footer>
			</card-main>
		{/if}
		{#if accountType === 'google' || accountType === 'facebook'}
			<card-main>
				<card-header>
					<h3>Single Sign-in Account</h3>
				</card-header>
				<card-body class="py-4">
					Your current account is using Single Sign in see details below
					{#if accountType === 'google'}
						<div>
							<div
							class="border border-slate-800 rounded-sm shadow-lg m-1 md:m-3 flex justify-items-center"
							>
								<div class="flex inline-flex bg-green-900 w-[4.1rem] justify-center">
									<Icon icon="fa:google" class=" m-3 text text-white text-[35px]" />
								</div>
								<div class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold inline-block align-baseline my-auto">
									{user.email}
								</div>
							</div>
						</div>
					{/if}
					{#if accountType === 'facebook'}
						<div class="max-w-[600px]">
							<a href="/login/facebook">
								<div
									class="border border-slate-800 rounded-sm shadow-lg mt-1 md:mt-3 flex justify-items-center"
								>
									<div class="flex inline-flex bg-slate-800 w-[4.1rem] justify-center">
										<Icon icon="fa:facebook" class="m-3 text text-white text-[35px]" />
									</div>
									<div class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold inline-block align-baseline my-auto">
										{user.email}
									</div>
								</div>
							</a>
						</div>
					{/if}
				</card-body>
			</card-main>
		{/if}

		<card-main>
			<card-header>
				<h3>Cancel Subscription</h3>
			</card-header>
			<card-body>
				Once your account is deleted, all of its resources and data will be permanently deleted.
				Before deleting your account, please download any data or information that you wish to
				retain.
			</card-body>
			<card-footer>
				<form method="post" action="?/cancelSub">
					<button type="submit" class="btn variant-filled-secondary">Cancel Subscription</button>
				</form>
			</card-footer>
		</card-main>

		<card-main>
			<card-header class="bg-red-300 border-red-700">
				<h3 class="bg-red-300 text-red-700 text-sh">Delete Account</h3>
			</card-header>
			<card-body>
				Once your account is deleted, all of its resources and data will be permanently deleted.
				Before deleting your account, please download any data or information that you wish to
				retain.
			</card-body>
			<card-footer>
				<form method="post" action="?/deleteAccount">
					<button class="btn variant-filled-secondary"> Delete Accoount </button>
				</form>
			</card-footer>
		</card-main>
	</div>
</div>

<style>
	card-body {
		@apply py-4;
	}
</style>
