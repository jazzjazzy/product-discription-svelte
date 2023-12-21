<script lang="ts">
	import Icon from '@iconify/svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let storeDescription = '';

	const popupShopInfo: PopupSettings = {
		event: 'click',
		target: 'popupShopInfo',
		placement: 'bottom'
	};

</script>

<div class="card p-3">
    <div class="card-header pt-0 px-0">
        <h3 class="pl-3 pb-2 font-semibold text-lg">
            Shop Description
            <span class="w-2 cursor-pointer" use:popup={popupShopInfo}>
                <Icon icon="octicon:info-24" class="inline" />
            </span>
            <div class="arrow card p-4 w-72 shadow-xl" data-popup="popupShopInfo">
                <div class="py-3"><h4>Discribe your shop</h4></div>
                <div class="text-sm">
                    Provide a detailed description of what your shop offers, including the types
                    of products available. The more information you include, the better we can
                    tailor the description to appeal to your target audience. Be sure to mention
                    unique aspects that aren't immediately apparent just by looking at the
                    products.
                </div>
            </div>
        </h3>
    </div>
    <div class="card-body">
        <textarea
            bind:value={storeDescription}
            placeholder="Discribe your shop and what you sell here..."
            class="w-full h-36 p-1 bg-gray-200 border-gray-300 focus:border-gray-400 focus:outline-0 focus:ring-1 rounded-xl"
        />
    </div>
</div>
