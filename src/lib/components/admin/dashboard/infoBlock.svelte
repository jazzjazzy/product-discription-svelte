<script lang="ts">
	export let title: string;
	export let value: number;
</script>

<div class="mainbox">
	<div class="">
		<h3 class="text-xl text-center">{@html title}</h3>
		<div class="text-7xl text-emerald-700 text-center font-semibold">
			{value}
		</div>
	</div>
</div>

<style>
    .mainbox {
        @apply w-full h-full border-4 border-purple-600 rounded-xl flex justify-center items-center;
		box-shadow: 5px 5px 5px 5px rgba(126, 115, 115, 0.25);
    }
    </style>
