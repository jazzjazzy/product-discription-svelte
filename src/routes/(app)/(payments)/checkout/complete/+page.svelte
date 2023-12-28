<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

</script>

<h1>Checkout complete</h1>

<p>{data.message}</p>
