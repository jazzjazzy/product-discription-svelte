<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex justify-center">
	<card-main class="w-2/4">
		<card-header><h1>Checkout complete</h1></card-header>
		<card-body class="py-4">
			{data.message}
		</card-body>
		<card-footer class="py-4"> &nbsp; </card-footer>
	</card-main>
</div>
