<script lang="ts">
	import Icon from '@iconify/svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let productDescription = '';

	const popupProductInfo: PopupSettings = {
		event: 'click',
		target: 'popupProductInfo',
		placement: 'bottom'
	};
</script>

<div class="card p-3 mt-3">
	<div class="card-header pt-0 px-0">
		<h3 class="pl-3 pb-2 font-semibold text-lg">
			Product Description
			<span class="w-2 cursor-pointer" use:popup={popupProductInfo}>
				<Icon icon="octicon:info-24" class="inline" />
			</span>
			<div class="card p-4 w-72 shadow-xl" data-popup="popupProductInfo">
				<div class="py-3"><h4>Discribe the Product</h4></div>
				<div class="text-sm">
					In your description, focus on highlighting the finer details captured in the image that
					might not be immediately evident. This includes specifying the materials used in the
					product, which can give insights into its quality and texture. For example, if it's a
					wooden item, mention the type of wood and its finish; for a fabric product, describe the
					fabric type and feel. Additionally, provide accurate measurements or size information to
					help visualize the actual scale of the product. Such details are essential as they offer a
					more comprehensive understanding of the product, beyond what is visible in the image. They
					play a crucial role in setting the right expectations and attracting the right audience
					who appreciates these nuances.
				</div>
			</div>
		</h3>
	</div>
	<div class="card-body">
		<textarea
			bind:value={productDescription}
			placeholder="Discribe the product in the image here..."
			class="w-full h-36 p-1 bg-gray-200 border-gray-300 focus:border-gray-400 focus:outline-0 focus:ring-1 rounded-xl"
		/>
	</div>
</div>
