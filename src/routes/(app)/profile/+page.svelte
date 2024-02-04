<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import type { User } from '$lib/types/user';
	import type { Subscription, trial } from '$lib/types/subscription';
	import type { trialPeriod } from '$lib/types/webhooks';
	import Dialog from '$lib/components/dialog.svelte';

	export let data: PageData;
	export let form;

	let errorMessage: string = '';
	let user = data.user;
	let accountType: string = '';
	let subscription = data.user.subscription[0];
	let trial: trialPeriod;

	console.log('subscription', subscription);

	if (subscription && subscription.trial_end_date && subscription.trial_end_date > new Date()) {
		let date1: Date = new Date();
		let date2: Date = subscription.trial_end_date;

		// Calculate the difference in milliseconds
		let differenceInMilliseconds = date2 - date1;

		// Convert milliseconds to days
		let differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
		let differenceInWholeDays = Math.round(differenceInDays);

		trial = {
			isTrial: true,
			days: differenceInWholeDays,
			endDate: subscription.trial_end_date
		};
	}

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

	/**
	 * Will format a date to a human readable format
	 *
	 * @param thedate
	 * @return Returns a formatted date string OR an empty string if date is null
	 */
	function formatDate(date: Date | null) {
		if (date === null) {
			return ''; // or any default string you prefer
		}
		let formattedDate = new Intl.DateTimeFormat('en-AU', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		}).format(date);
		return formattedDate;
	}

	let isSubscriptionDialogOpen = false;
	async function openSubscriptionDialog() {
		isSubscriptionDialogOpen = true;
	}

	function closeSubscriptionDialog() {
		isSubscriptionDialogOpen = false;
	}

	let SubscriptionValue = '';
	$: isSubscription = SubscriptionValue.toLowerCase().includes('Delete');

	let isDeleteDialogOpen = false;
	async function openDeleteDialog() {
		isDeleteDialogOpen = true;
	}

	function closeDeleteDialog() {
		isDeleteDialogOpen = false;
	}

	let deleteValue = '';
	$: isDelete = deleteValue.toLowerCase().includes('delete');
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
								/>
							</div>
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
								<div
									class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold inline-block align-baseline my-auto"
								>
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
									<div
										class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold inline-block align-baseline my-auto"
									>
										{user.email}
									</div>
								</div>
							</a>
						</div>
					{/if}
				</card-body>
			</card-main>
		{/if}
		{#if data.subscribed}
			<card-main>
				<card-header>
					<h3>Subscription</h3>
				</card-header>
				<card-body>
					<p>
						Your current active subscription is <span class="font-semibold"
							>{subscription.type}</span
						> details below:
					</p>
					<div
						class="border py-6 border-slate-800 rounded-sm shadow-lg mt-1 md:mt-3 flex justify-items-center"
					>
						<div class="flex inline-flex w-[8.1rem] justify-center my-auto h-full">
							<div class="text-3xl uppercase">{subscription.type}</div>
						</div>

						<div class="inline-block align-baseline my-auto pl-6">
							{#if subscription.stripe_current_period_end}
								<!-- if subscription is active then show date and info on next billing date -->
								Next invoice:
								<span class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold">
									{@html formatDate(subscription?.stripe_current_period_end)}
								</span><br />
							{:else}
								Next invoice: none;
							{/if}

							{#if subscription.stripe_cancel_at_period_end}
								<!-- if subscription is cancel then show date and info on when it ends  -->
								Canellation date :<span
									class="text-red-400 mx-2 md:mx-4 text-xs md:text-lg font-extrabold"
								>
									{@html formatDate(subscription.stripe_cancel_at)}<br />
								</span>
								Canelled on:<span class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold">
									{@html formatDate(subscription.stripe_canceled_at)}<br />
								</span>
							{:else if trial.isTrial}
								<!-- if subscription is in trial period then show date and info on when it ends  -->
								Trial days left:<span class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold">
									{@html trial.days} days <br />
								</span>
								Trial end date:<span class="mx-2 md:mx-4 text-xs md:text-lg font-extrabold">
									{@html formatDate(trial.endDate)}
								</span>
							{/if}
						</div>
					</div>
					<p class="text-xs pt-3">
						if you cancel your subscription, You'll continue to have access to all subscription
						benefits until the end of your current billing cycle. No further charges will be applied
						to your account once the current billing period concludes. your account data and
						preferences may be stored for a limited time, allowing for an easier reactivation in the
						future should you choose to return.
					</p>
				</card-body>

				<card-footer>
					<button
						type="submit"
						class="btn variant-filled-secondary"
						on:click={openSubscriptionDialog}>Cancel Subscription</button
					>

					<form method="post" action="?/cancelSub">
						<Dialog isOpen={isSubscriptionDialogOpen} onClose={closeSubscriptionDialog}>
							<div slot="header">Cancel Subscription</div>
							<span slot="footer"
								><button
									type="submit"
									disabled={!isSubscription}
									class="btn variant-filled-secondary">Cancel Subscription</button
								></span
							>
							<div class="h-[200px] overflow-y-auto">
								<div class="py-3">
									To cancel your current active <span class="font-semibold"
										>{subscription.type}</span
									>
									subscription enter <span class="font-semibold">'Subscription'</span> in the field below.
									and the click the Cancel Subscription button.
								</div>
								<input
									type="text"
									name="cancel"
									bind:value={SubscriptionValue}
									placeholder="Type here..."
								/>
							</div>
						</Dialog>
					</form>
				</card-footer>
			</card-main>
		{/if}
		<card-main>
			<card-header class="bg-red-300 border-red-700">
				<h3 class="bg-red-300 text-red-700 text-sh">Delete Account</h3>
			</card-header>
			<card-body>
				Once your account is deleted, all of its resources and data will not be
				accessible. Before deleting your account, please download any data or information that you
				wish to retain.
			</card-body>
			<card-footer>
				<button class="btn variant-filled-secondary" on:click={openDeleteDialog}>
					Delete Account
				</button>

				<form method="post" action="?/deleteAccount">
					<Dialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog}>
						<div slot="header">Delete Account</div>
						<span slot="footer"
							><button type="submit" disabled={!isDelete} class="btn variant-filled-secondary"
								>Delete Account</button
							></span
						>
						<div class="h-[200px] overflow-y-auto">
							<div class="py-3">
								To delete your current active account enter <span class="font-semibold"
									>'Delete'</span
								> in the field below. and the click the Cancel Delete button.
							</div>
							<input
								type="text"
								name="account"
								bind:value={deleteValue}
								placeholder="Type here..."
							/>
						</div>
					</Dialog>
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
