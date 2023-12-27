<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="pt-3 px-3 md:px-16 lg:px-16 xl:px-96">
	<slot />
</div>
