<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: FormData;

	console.log(form);

	let isError: int = 411;

	console.log(isError);

	let passwordForm: HTMLFormElement;

	function submitPassword() {
		passwordForm.submit();
	}
</script>

<div class="container py-10 px-4 flex justify-center">
	<div class="w-1/2 grid gap-7">
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
						<div class="w-full"><input type="password" name="oldpassword" class="w-full" /></div>
					</div>
					<div>
						<label for="newpassword">New Password</label>
						<div><input type="password" name="newpassword" class="w-full" /></div>
					</div>
					<div>
						<label for="confirmpassword">Confirm Password</label>
						<div><input type="password" name="confirmpassword" class="w-full" /></div>
					</div>
				</form>
			</card-body>
			<card-footer>
				<button class="btn variant-filled-secondary" on:click={submitPassword}>
					Change Password
				</button>
			</card-footer>
		</card-main>
		<card-main>
			<card-header>
				<h3>Single Sign-in Account</h3>
			</card-header>
			<card-body>
				Your current account is using Single Sign in see details below
				<div class="grid grid-cols-12 m-5 border border-green-500">
					<div class="col-span-1 p-5 bg-green-600">G</div>
					<div class="col-span-11 p-5">jsjazzau@gmail.com</div>
				</div>
			</card-body>
		</card-main>

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
			<card-header>
				<h3>Delete Account</h3>
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
