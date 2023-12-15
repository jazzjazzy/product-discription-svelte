<script>
	import '../app.pcss';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	export let data;
</script>

<content>
	<nav>
		<div class="grid grid-cols-3 border-2 mb-4 bg-white">
			<div class="col-span-1 flex place-content-start p-4">
				<div class="font-sans">
					<div class="btn-lg inline-block">
						<a href="/forum"><div class="text-2xl">Forum</div></a>
					</div>
					<div class="btn-lg inline-block"><a href="/faq"><div class="text-2xl">FAQ</div></a></div>
					<div class="btn-lg inline-block">
						<a href="/blog"><div class="text-2xl">Blog</div></a>
					</div>
					<div class="btn-lg inline-block">
						<a href="/dashboard"><div class="text-2xl">Dashboard</div></a>
					</div>
					<div class="btn-lg inline-block">
						<a href="/pricing"><div class="text-2xl">Pricing</div></a>
					</div>
				</div>
			</div>
			<div class="col-span-1 text-5xl text-center m-auto align-middle font-semibold">
				<a href="/">Dis<span class="text-7xl line- text-red-500">.</span>scription</a>
			</div>
			<div class="col-span-1 flex place-content-end p-4">
				<div class="font-sans">
					{#if data.userId == null}
						<div class="inline-block">
							<a href="/login"><div class="btn-lg variant-filled">Login</div></a>
						</div>
						<div class="inline-block">
							<a href="/regisitor"><div class="btn-lg variant-filled">Sign-up</div></a>
						</div>
					{:else}
						<form method="post" action="/login?/signout" class="inline-block">
							<button type="submit" class="btn-lg variant-filled">Logout</button>
						</form>
						<div class="inline-block">
							<a href="/profile"><div class="btn-lg variant-filled">Profile</div></a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</nav>
	<container class="flex justify-center pt-16">
		<slot />
	</container>
</content>
