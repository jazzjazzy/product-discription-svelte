<script lang="ts">
	export let charatorCount = 500;
</script>

<div class="grid grid-cols-3">
	<div class="col-span-1">Small</div>
	<div class="col-span-1 text-center">Medium</div>
	<div class="col-span-1 text-right">Large</div>
</div>
<input type="range" min="500" max="1300" step="100" bind:value={charatorCount} />
<p>Approximate charactors: {charatorCount}</p>
