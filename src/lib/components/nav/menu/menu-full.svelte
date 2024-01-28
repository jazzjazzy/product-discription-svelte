<script lang="ts">
		export let data;
	export let adminGod = false;
</script>



<div class="font-sans">
	<div class="btn-lg inline-block border-b-2 border-b-white hover:border-b-orange-500">
		<a href="/"><div class="text-2xl">Home</div></a>
	</div>
	{#if data.plan === 'Pro' || data.plan === 'Ultra' || adminGod}
		<!--<div class="btn-lg inline-block">
            <a href="/faq"><div class="text-2xl">FAQ</div></a>
        </div> -->
		<div class="btn-lg inline-block border-b-2 border-b-white hover:border-b-orange-500">
			<a href="/history"><div class="text-2xl">History</div></a>
		</div>
	{/if}
	<div class="btn-lg inline-block border-b-2 border-b-white hover:border-b-orange-500">
		<a href="/pricing"><div class="text-2xl">Pricing</div></a>
	</div>
	<div class="btn-lg pb-0.5 inline-block  border-b-2 border-b-white hover:border-b-orange-500">
		<a href="/dashboard" class="btn variant-ghost-primary rounded-md m-0"><div class="text-2xl">Generate</div></a>
	</div>
	{#if adminGod}
		<div class="btn-lg inline-block  border-b-2 border-b-white hover:border-b-orange-500">
			<a href="/admin"><div class="text-2xl">Admin</div></a>
		</div>
	{/if}
</div>
