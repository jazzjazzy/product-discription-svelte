<script lang="ts">
	import Icon from '@iconify/svelte';
	export let successMessage = '';
</script>

<aside
	class="bg-green-100 border border-green-400 text-green-700 px-4 mt-1 py-3 rounded relative"
	role="alert"
>
	<!-- Flex container for icon and text -->
	<span class="flex items-center">
		<!-- Icon -->
		<Icon icon="material-symbols:warning-outline" class="text-4xl text-green-700" />
		<!-- Text Message -->
		<span class="ml-2">{successMessage}</span>
	</span>
</aside>
