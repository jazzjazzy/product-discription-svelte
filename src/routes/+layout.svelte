<script>
	import '../app.pcss';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Nav from '$lib/components/nav/nav.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data;
</script>

<content>
	<Nav {data} />
	<container>
		<slot />
	</container>
	<footer class="flex justify-center mt-10 min-h-[200px] text-slate-100 bg-slate-700">
		<div class="grid grid-cols-3 gap-4 md:w-3/5 my-10 w-5/6 text-xs">
			<div class="col-span-1">
				<ul>
					<li class=" hover:text-slate-300"><a href="/policy/terms">Term of service</a></li>
					<li><a href="/policy/privacy">Privacy Policy</a></li>
					<li><a href="/policy/cookie">Cookies Policy</a></li>
				</ul>
			</div>
			<div class="col-span-1">
				<ul>
					<li><a href="mailto:jsjazzau@gmail.com">Contact us</a></li>
					<li><a href="/pricing">Pricing</a></li>
				</ul>
			</div>
			<div class="col-span-1"></div>
		</div>
	</footer>
</content>

<style>
	/* Assuming <content> is the main wrapper for your page content */
	content {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Viewport Height */
	}

	container {
		flex: 1; /* This makes the container grow to fill available space */
	}

	footer li {
		@apply py-1 text-slate-100;
		/* Your existing footer styles */
	}

	footer li :hover {
		@apply text-green-300;
	}
</style>
