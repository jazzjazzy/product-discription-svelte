<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;
</script>

<div class="w-full">
	<section>
		<div class="px-4 lg:px-44 grid md:grid-cols-2">
			<div class="md:col-span-1 flex flex-col justify-end items-end">
				<h1 class="text-5xl font-bold text-gray-900 py-4 font-walkway">
					Boost Your Sales with Compelling Product Descriptions
				</h1>
				<p class="text-gray-600 py-4 font-montserrat pr-4">
					Welcome to dis.scription, your premier destination for cutting-edge AI-powered product
					description generation. Ideal for e-commerce platforms like Etsy, Shopify, and
					WooCommerce, our tool revolutionizes how online businesses craft compelling narratives for
					their products. With dis.scription, unlock the potential of SEO-optimized, engaging, and
					unique product descriptions that not only attract but also convert visitors into
					customers. Our intuitive platform is designed for ease of use, ensuring every product on
					your online store shines with its own story. Whether you're a small artisan shop on Etsy,
					a growing brand on Shopify, or a diverse marketplace on WooCommerce, dis.scription caters
					to all your product storytelling needs. Enhance your online presence, improve search
					engine rankings, and drive sales with dis.scription – where every word counts in elevating
					your e-commerce success.
				</p>
				<div class="text-gray-600 w-full flex justify-center py-4">
					<a
						href="/signup"
						class="btn variant-filled-primary text-2xl font-semibold font-montserrat"
					>
						SIGN UP NOW
					</a>
				</div>
			</div>
			<div class="col-span-1 content-end">
				<img
					src="/images/pexels-kampus-production-7289707.jpg"
					alt={data.title}
					class="w-full h-full object-cover object-center rounded-lg"
				/>
			</div>
		</div>
	</section>
	<section>
		<div class="lg:px-44 w-full grid md:grid-cols-3 gap-6 pt-10">
			<card-main class="col-span-1 border-2 px-2 py-6 border-orange-600 rounded-lg">
				<div class="flex justify-center text-center">
					<img src="\images\Etsy_logo.svg.png" class="h-32" alt="Etsy Logo" />
				</div>
				<div>
					Transform your Etsy listings with dis.scription! Our tool creates captivating product
					descriptions that bring your items to life, attracting and engaging customers. Perfect for
					Etsy's unique marketplace, dis.scription ensures your crafts, art, or vintage treasures
					stand out. Boost your sales with descriptions that not only describe but also enchant and
					sell.
				</div>
			</card-main>
			<card-main class="col-span-1 border-2 px-2 py-6 border-green-500 rounded-lg">
				<div class="flex justify-center text-center">
					<img src="\images\shopify-logo.svg" class="h-32" alt="Shopify Logo" />
				</div>
				<div>
					Elevate your Shopify store with dis.scription! Our innovative tool crafts engaging product
					descriptions that capture the essence of your items, setting your store apart. Ideal for
					Shopify's dynamic marketplace, dis.scription helps boost your visibility and sales.
					Attract more customers with descriptions that are as unique and compelling as your
					products."
				</div>
			</card-main>
			<card-main class="col-span-1 border-2 px-2 py-6 border-purple-800 rounded-lg">
				<div class="flex justify-center text-center">
					<img src="\images\WooCommerce_logo.svg" class="h-32" alt="WooCommerce Logo" />
				</div>
				<div>
					Maximize your WooCommerce store's potential with dis.scription! Our tool specializes in
					creating dynamic product descriptions that resonate with your audience. Designed for the
					diverse WooCommerce ecosystem, dis.scription enhances your product appeal, driving both
					traffic and conversions. Elevate your online presence with descriptions that not only
					inform but also inspire and sell.
				</div>
			</card-main>
		</div>
	</section>
	<section>
		<div class="lg:px-44 text-gray-600 w-full flex justify-center py-4">
			<a
				href="/pricing"
				class="btn w-full text-wrap variant-filled-primary md:text-2xl p-2 md:p-10 rounded-xl font-semibold font-montserrat hover:bg-gray-300 shadow-2xl hover:shadow-gray-500"
			>
				Chechout our pricing afforable pricing plans <span class="pl-6 py-0 text-6xl font-semibold">
					>
				</span>
			</a>
		</div>
	</section>
	<section>
		<div class="lg:px-44 text-gray-600 w-full flex justify-center py-4">
			<ul>
				<li>
					<Icon icon="icon-park:six-points" class="inline mr-3" /> "AI-driven product description generator
					for e-commerce"
				</li>
				<li>
					<Icon icon="icon-park:six-points" class="inline mr-3" /> "Automated Etsy product description
					writing tool"
				</li>
				<li>
					<Icon icon="icon-park:six-points" class="inline mr-3" /> "Shopify store SEO-friendly description
					creator"
				</li>
				<li>
					<Icon icon="icon-park:six-points" class="inline mr-3" /> "WooCommerce product description optimization
					software"
				</li>
				<li>
					<Icon icon="icon-park:six-points" class="inline mr-3" /> "AI content generation for online
					retail descriptions"
				</li>
			</ul>
		</div>
	</section>
	<section>
		<div class="lg:px-44 text-gray-600 w-full">
			<h2 class="h2">Testimonials</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="col-span-1  p-6 flex flex-col justify-between">
					<div class="text-xl">
						<span class="text-3xl">"</span>Its great, It allows me to get my products up quickly with
						a decent places holder, but in most cases product they are sold before I can changes it,
						I love it<span class="text-3xl">"</span>
					</div>
					<div class="pt-4text-right mt-auto">
						Jason owner of <span class="font-extrabold">The Oak Dragon</span>
					</div>
				</div>
				<div class="col-span-1 p-6 flex flex-col justify-between">
					<div class="text-xl">
						<span class="text-3xl">"</span>There is only so many to describe a chopping board, this
						tool helps me get more depth into my description, helping with SEO<span class="text-3xl">"</span>
					</div>
					<div class="pt-4 text-right mt-auto">
						Sally co-owner of the <span class="font-extrabold">The Endgrain company</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	li {
		list-style-type: none;
		padding: 0.75rem;
	}
	li:hover {
		@apply text-gray-400;
	}

	section {
		padding: 5rem .25rem;
	}

	.text-3xl{
		line-height: 0%;
	}
</style>
