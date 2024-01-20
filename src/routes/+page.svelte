<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!--<div class=" px-3">
	<div class="md:px-16 lg:px-16 xl:px-44">
		<div class="main">
			<div class="grid grid-cols-2">
				<div class="col-span-1 content">
					<h1 class="text-5xl font-bold text-gray-900">
						Boost Your Sales with Compelling Product Descriptions
					</h1>
					<p class="text-gray-600">
						Craft persuasive product descriptions that captivate your customers and drive sales.
					</p>
				</div>
				<div class="col-span-1 content-end w-full h-full">
					<img
						src="/images/pexels-kampus-production-7289707.jpg"
						alt={data.title}
						class="w-full h-full object-cover object-center"
					/>
				</div>
			</div>
		</div>
	</div>
</div> -->
<div class="w-full">
	<div class="px-44 grid grid-cols-2">
		<div class="col-span-1 flex flex-col justify-end items-end">
			<h1 class="text-5xl font-bold text-gray-900 py-4 font-walkway">
				Boost Your Sales with Compelling Product Descriptions
			</h1>
			<p class="text-gray-600 py-4 font-montserrat pr-4">
				Craft persuasive product descriptions that captivate your customers and drive sales.Craft
				persuasive product descriptions that captivate your customers and drive sales.Craft
				persuasive product descriptions that captivate your customers and drive sales.Craft
				persuasive product descriptions that captivate your customers and drive sales.Craft
				persuasive product descriptions that captivate your customers and drive sales.Craft
				persuasive product descriptions that captivate your customers and drive sales.
			</p>
			<div class="text-gray-600 w-full flex justify-center py-4">
				<button class="btn variant-filled-primary text-2xl font-semibold font-montserrat"
					>SIGN UP NOW</button
				>
			</div>
		</div>
		<div class="col-span-1 content-end w-full h-full">
			<img
				src="/images/pexels-kampus-production-7289707.jpg"
				alt={data.title}
				class="w-full h-full object-cover object-center"
			/>
		</div>
	</div>
</div>
