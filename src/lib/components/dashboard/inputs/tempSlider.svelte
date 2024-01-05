<script lang="ts">
	export let temperature = 0.1;
</script>

<div class="grid grid-cols-2">
	<div class="col-span-1">Basic</div>
	<div class="col-span-1 text-right">Creative</div>
</div>
<input type="range" min="0.0" max="1" step="0.1" bind:value={temperature} />
<p>Creative Style: {(temperature * 10)}</p>
