<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

</script>

<div class="flex justify-center">
	<card-main class="w-full md:w-2/4">
		<card-header><h1 class="h2 md:h1">Checkout complete</h1></card-header>
		<card-body class="py-4">
			{data.message}
			{#if data.change}
				<div class="py-4">Your order has been updated and will be charged in your next billing cycle</div>
			{/if}
		</card-body>
		<card-footer class="py-4"> &nbsp; </card-footer>
	</card-main>
</div>
