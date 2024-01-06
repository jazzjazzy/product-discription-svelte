<script lang="ts">
	import Icon from '@iconify/svelte';
	export let errorMessage = '';
</script>

<aside
	class="bg-red-100 border border-red-400 text-red-700 px-4 mt-1 py-3 rounded relative"
	role="alert"
>
	<!-- Flex container for icon and text -->
	<span class="flex items-center">
		<!-- Icon -->
		<Icon icon="material-symbols:warning-outline" class="text-4xl" />
		<!-- Text Message -->
		<span class="ml-2">{@html errorMessage}</span>
	</span>
</aside>
