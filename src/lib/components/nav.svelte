<script lang="ts">
	import type { loginSession } from '$lib/types/user';

	export let data: loginSession;

	let adminGod = false;

	if (data.role === 'ADMIN' || data.role === 'GOD') {
		adminGod = true;
	}
</script>

<nav>
	<div class="grid grid-cols-12 border-2 mb-4 bg-white">
		<div class="col-span-5 flex place-content-start p-4">
			<div class="font-sans">
				<!-- do these later
                <div class="btn-lg inline-block">
                    <a href="/forum"><div class="text-2xl">Forum</div></a>
                </div>
                <div class="btn-lg inline-block">
                    <a href="/faq"><div class="text-2xl">FAQ</div></a>
                </div>
                <div class="btn-lg inline-block">
                    <a href="/blog"><div class="text-2xl">Blog</div></a>
                </div>
            -->
				{#if data.plan === 'Pro' || data.plan === 'Ultra' || adminGod}
					<div class="btn-lg inline-block">
						<a href="/Setting"><div class="text-2xl">Setting</div></a>
					</div>
					<div class="btn-lg inline-block">
						<a href="/history"><div class="text-2xl">History</div></a>
					</div>
				{/if}
				<div class="btn-lg inline-block">
					<a href="/dashboard"><div class="text-2xl">Dashboard</div></a>
				</div>
				<div class="btn-lg inline-block">
					<a href="/pricing"><div class="text-2xl">Pricing</div></a>
				</div>
				{#if adminGod}
					<div class="btn-lg inline-block">
						<a href="/admin"><div class="text-2xl">Admin</div></a>
					</div>
				{/if}
			</div>
		</div>
		<div class="col-span-2 text-5xl text-center m-auto align-middle font-semibold">
			<a href="/">Dis<span class="text-7xl line- text-red-500">.</span>scription</a>
		</div>
		<div class="col-span-5 flex place-content-end p-4">
			<div class="font-sans">
				{#if data.userId == null}
					<div class="inline-block">
						<a href="/login"><div class="btn-lg variant-filled">Login</div></a>
					</div>
					<div class="inline-block">
						<a href="/signup"><div class="btn-lg variant-filled">Sign-up</div></a>
					</div>
				{:else}
					<div class="grid grid-cols-6 gap-3">
						<div class="col-span-4 text-right">
							<div class="text-sm">{data.name}</div>
							<div class="text-xs">{data.email}</div>
							{#if data.subscribed == true}
								<div class="text-xs">Account: {data.plan}</div>
							{/if}
						</div>
						<div class="col-span-1">
							<form method="post" action="/login?/signout">
								<button type="submit" class="btn-lg variant-filled">Logout</button>
							</form>
						</div>
						<div class="col-span-1">
							<a href="/profile"><div class="btn-lg variant-filled">Profile</div></a>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
