<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container py-10 px-4 w-2/3">
	<div class="grid grid-cols-2">
		<div class="col-span-1 content">
			<h1 class="text-5xl font-bold text-gray-900">
				Boost Your Sales with Compelling Product Descriptions
			</h1>
			<p class="text-gray-600">
				Craft persuasive product descriptions that captivate your customers and drive sales.
			</p>
		</div>
		<div class="col-span-1">
			<img
				src="/images/pexels-kampus-production-7289707.jpg"
				alt={data.title}
				class="w-full h-full object-cover object-center"
			/>
		</div>
	</div>
</div>
