<script lang="ts">
	import { formateKeywordstring } from '$lib/helpers/Utilis';
	import { TabGroup, Tab, AppBar, FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from '$types';
	import CopyContentToClipBoard from '$lib/components/copyContentToClipBoard.svelte';

	export let form: ActionData;

	let currentURL = $page.url;
	console.log(currentURL.origin);

	console.log(form);

	let loading = false;
	let etsyResponse = '';
	let endStream = false;
	let error = '';

	let success: boolean = false;
	let message: string = '';
	//let imageUrl = 'https://storage.googleapis.com/imagebackdrop/bedroom/IMG_5150.JPG';
	let imageUrl = '';
	let tabSet: number = 0;

	if (form) {
		let { success: statusform, message: messageform } = form;
		if (statusform) {
			imageUrl = messageform;
			handleImageTab();
		}
		success = statusform;
		message = messageform;
	}

	let pageDescription = '';
	let divDescription: HTMLDivElement;

	let pageTitle = '';
	let pageTitleCount = 0;
	let divTitle: HTMLDivElement;

	let pageKeywords = '';
	let pageDescriptionCount = 0;
	let divKeywords: HTMLDivElement;

	let pageJson = '';

	let isEditable = false;

	let processing = false;
	let buttonString = 'Write Copy';

	let keywordLength = 20;
	let clearKeywords = ''; //keywords without the ones that are more than 20 characters
	//outgoing data to description product
	let productDescription =
		'This is a dice tower with an inbuilt tray made from cherry wood and lined with a blue felt';
	let storeDescription =
		'we are a store that sells equipment for board games, dice games and role-playing games, we sell dice towers and dice trays hand-made from exotic wood species ';

	function handleImageTab() {
		if (imageUrl) {
			tabSet = 2;
		}
	}

	/**
	 * @type {string}
	 */
	let searchResponse = '';
	/**
	 * @type {Array<string | {title: string, description: string}>}
	 */
	let recommendations = [];

	/**
	 * Count characters on in a static div for Title and Description
	 * This is used to calulate after finishing processing
	 */
	function titleAndDescriptionLength(): void {
		pageTitleCount = pageTitle.length;
		pageDescriptionCount = pageDescription.length;
	}

	/**
	 * Count characters on editable div for Title and Description
	 * This is the live count if a user is editing the text
	 *
	 * @param event
	 */
	function recountTitleAndDescriptionLength(event: Event): void {
		const target = event.target as HTMLDivElement;

		if (target.dataset.type === 'title') {
			let title = target.textContent || '';
			pageTitleCount = title.length;
		} else if (target.dataset.type === 'description') {
			console.log(target.textContent);
			let description = target.textContent || '';
			pageDescriptionCount = description.length;
		}
	}

	/**
	 * format keywords
	 *
	 * @param event
	 */
	function checkKeywordLength(event: Event): void {
		let target = event.target as HTMLDivElement;
		let editableText = target.textContent || '';

		pageKeywords = formateKeywordstring(editableText, keywordLength);
	}

	async function handleUpload() {
		const form = document.getElementById('uploadForm') as HTMLFormElement;
		form.submit();
	}

	/**
	 * replace new line with break
	 * @param text
	 */
	function newlineToBreak(text: string) {
		return text.replace(/\n/g, '<br>');
	}

	/**
	 * @param {string} url
	 * @returns {Promise<string>}
	 */
	async function discription() {
		if (loading) return;
		loading = true;

		console.log(productDescription);

		let imageDescription: string = '';

		try {
			processing = true;
			buttonString = 'Processing image to Writing Copy...';

			/****
			 *
			 * GET IMAGE DESCRIPTION FROM Replicate AI
			 *
			 */
			const responseDisc = await fetch('api/discriptor', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					imageUrl: imageUrl,
					productDescription: productDescription,
					storeDescription: storeDescription
				})
			});

			let response = await responseDisc.json();
			const firstResult = response.body;

			if (response.status === 200) {
				const resultsArray = JSON.parse(firstResult);

				if (resultsArray && resultsArray.results.length > 0) {
					const firstItem = resultsArray.results[0];

					let title = firstItem.product_title;
					let description = firstItem.product_description;
					let keywords = firstItem.product_keywords;
					pageJson = JSON.stringify(firstItem, null, 4);

					//check if all keywords are less than 20 characters .and mark the ones that are not
					const keywordsChecked = formateKeywordstring(keywords, keywordLength);

					pageDescriptionCount = description.length;
					pageTitleCount = title.length;

					pageTitle = title;
					pageDescription = description;
					pageKeywords = keywordsChecked;
					clearKeywords = keywords;
					isEditable = true;

					buttonString = 'images Description created successfully.';

					console.log('Description created successfully.');
				} else {
					console.log('No results found or results array is empty');
				}
			}

			loading = false;
		} catch (error) {
			console.error('Error Description script:', error);
		}
		processing = false;
		buttonString = 'Write New Copy';
	}

	function copyToClipboard(divElement: HTMLDivElement) {
		const content = divElement.innerText;
		navigator.clipboard.writeText(content).then(
			function () {
				console.log('Successfully copied to clipboard!');
			},
			function (err) {
				console.error('Unable to copy', err);
			}
		);
	}

	const popupShopInfo: PopupSettings = {
		event: 'click',
		target: 'popupShopInfo',
		placement: 'bottom'
	};

	const popupProductInfo: PopupSettings = {
		event: 'click',
		target: 'popupProductInfo',
		placement: 'bottom'
	};
</script>

<main class="main w-3/4">
	<div class="p-7">
		<div class="card">
			<div class="card-header p-6 mb-6 border-b-orange-500 border-b-2">
				<h1 class="text-4xl">Esty Assistant</h1>
			</div>
			<div class="cardbody px-5">
				<div class="grid gap-4 grid-cols-2">
					<div class="col-span-1">
						<TabGroup>
							<Tab bind:group={tabSet} name="tab1" value={0}>
								<span>
									<div class="w-full flex justify-center">
										<Icon icon="formkit:upload" class="text-4xl" />
									</div>
								</span>
								<span>Upload</span>
							</Tab>
							<Tab bind:group={tabSet} name="tab2" value={1}>
								<span>
									<div class="w-full flex justify-center">
										<Icon icon="formkit:link" class="text-4xl flex alert-actions" />
									</div>
								</span>
								<span>Link</span>
							</Tab>
							{#if imageUrl !== ''}
								<Tab bind:group={tabSet} name="tab3" value={2}>
									<span>
										<div class="w-full flex justify-center">
											<Icon icon="mdi:image" class="text-4xl flex alert-actions" />
										</div>
									</span>
									<span>Image</span>
								</Tab>
							{/if}
							<svelte:fragment slot="panel">
								{#if tabSet === 0}
									<form
										use:enhance
										id="uploadForm"
										action="?/upload"
										method="post"
										enctype="multipart/form-data"
									>
										<div class="h-72">
											<FileDropzone
												name="file"
												on:change={handleUpload}
												class="flex justify-center min-h-full"
											>
												<svelte:fragment slot="lead">
													<div class="w-full flex justify-center">
														<Icon icon="formkit:upload" class="text-4xl" />
													</div>
												</svelte:fragment>
												<svelte:fragment slot="message">Image Requiring Description</svelte:fragment
												>
												<svelte:fragment slot="meta">
													Upload an image that requires a discription to be generated
													{#if !success && message}
														<div class="bg-warning-700 text-red-700">{message}</div>
													{/if}
												</svelte:fragment>
											</FileDropzone>
										</div>
									</form>
								{:else if tabSet === 1}
									<div class="h-72">
										<div
											class="card backdrop flex py-2 border-2 border-black h-full w-full items-center justify-center"
										>
											<div class="card-body my-7 mx-3 w-full">
												<div class="w-full flex my-5 justify-center">
													<Icon icon="formkit:link" class="text-4xl" />
												</div>

												<div class="w-full text-center text-md">Image Requiring Description</div>
												<div class="w-full text-center text-xs mt-1">
													link to an image that requires a discription to be generated
												</div>
												<input
													type="text"
													class="w-full mt-3 px-3 rounded-lg border-sky-100 border-black"
													bind:value={imageUrl}
													on:input={handleImageTab}
													placeholder="https:// Enter image url"
												/><br />
											</div>
										</div>
									</div>
								{:else if tabSet === 2}
									{#if imageUrl !== ''}
										<img src="/uploads/{imageUrl}" alt="original" />
									{/if}
								{/if}
							</svelte:fragment>
						</TabGroup>
					</div>
					<div class="col-span-1">
						<div class="card p-3">
							<div class="card-header pt-0 px-0">
								<h3 class="pl-3 pb-2 font-semibold text-lg">
									Shop Description
									<span class="w-2 cursor-pointer" use:popup={popupShopInfo}>
										<Icon icon="octicon:info-24" class="inline" />
									</span>
									<div class="arrow card p-4 w-72 shadow-xl w-full" data-popup="popupShopInfo">
										<div class="py-3"><h4>Discribe you shop</h4></div>
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
											In your description, focus on highlighting the finer details captured in the
											image that might not be immediately evident. This includes specifying the
											materials used in the product, which can give insights into its quality and
											texture. For example, if it's a wooden item, mention the type of wood and its
											finish; for a fabric product, describe the fabric type and feel. Additionally,
											provide accurate measurements or size information to help visualize the actual
											scale of the product. Such details are essential as they offer a more
											comprehensive understanding of the product, beyond what is visible in the
											image. They play a crucial role in setting the right expectations and
											attracting the right audience who appreciates these nuances.
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
					</div>
				</div>

				<div class="w-full">
					<div class="flex justify-center">
						<button class="btn variant-filled my-2 w-4/6 text-fuchsia-400" on:click={discription}>
							{buttonString}
							{#if processing}
								<ProgressRadial
									class="w-6 h-6 ml-2"
									stroke={240}
									meter="stroke-primary-500"
									track="stroke-primary-500/30"
								/>
							{/if}
						</button>
					</div>
					<card-title>
						<AppBar
							padding="0"
							gridColumns="grid-cols-2"
							slotDefault="place-self-left"
							slotTrail="place-content-end"
						>
							<h2 class="flex justify-start text-2xl">Title</h2>
							<svelte:fragment slot="trail">
								{#if isEditable}
									<CopyContentToClipBoard element="pageTitle" />
								{/if}
							</svelte:fragment>
						</AppBar>
						<h1>
							<div
								bind:this={divTitle}
								class="w-full p-3"
								contenteditable={isEditable}
								on:input={recountTitleAndDescriptionLength}
								data-type="title"
								data-clipboard="pageTitle"
							>
								{@html pageTitle}
							</div>
						</h1>
						<div class="text-xs float-right text-red-500">
							{#if pageTitleCount > 0}
								{pageTitleCount}
							{/if}
						</div>
					</card-title>
					<card-description>
						<AppBar
							padding="0"
							gridColumns="grid-cols-2"
							slotDefault="place-self-left"
							slotTrail="place-content-end"
						>
							<h2 class="flex justify-start text-2xl">Description</h2>
							<svelte:fragment slot="trail">
								{#if isEditable}
									<CopyContentToClipBoard element="pageDescription" />
								{/if}
							</svelte:fragment>
						</AppBar>
						<div
							bind:this={divDescription}
							class="w-full p-3"
							contenteditable={isEditable}
							on:input={recountTitleAndDescriptionLength}
							data-type="description"
							data-clipboard="pageDescription"
						>
							{@html newlineToBreak(pageDescription)}
						</div>
						<div class="text-xs float-right text-red-500">
							{#if pageDescriptionCount > 0}
								{@html pageDescriptionCount}
							{/if}
						</div>
					</card-description>

					<card-keywords>
						<AppBar
							padding="0"
							gridColumns="grid-cols-2"
							slotDefault="place-self-left"
							slotTrail="place-content-end"
						>
							<h2 class="flex justify-start text-2xl">Keywords</h2>
							<svelte:fragment slot="trail">
								{#if isEditable}
									<CopyContentToClipBoard element="pageKeywords" />
								{/if}
							</svelte:fragment>
						</AppBar>
						<div
							bind:this={divKeywords}
							class="w-full p-3"
							contenteditable={isEditable}
							on:blur={checkKeywordLength}
						>
							{@html pageKeywords}
						</div>
						<div class="hidden" data-clipboard="pageKeywords">
							{@html clearKeywords}
						</div>
					</card-keywords>

					<card-json>
						<AppBar
							padding="0"
							gridColumns="grid-cols-2"
							slotDefault="place-self-left"
							slotTrail="place-content-end"
						>
							<h2 class="flex justify-start text-2xl">Json output</h2>
							<svelte:fragment slot="trail">
								{#if isEditable}
									<copyContentToClipBoard element="pageJson" />
								{/if}
							</svelte:fragment>
						</AppBar>
						<div class="w-full p-3">
							<pre id="json" data-clipboard="pageJson">{@html pageJson}</pre>
						</div>
					</card-json>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	card-title,
	card-description,
	card-keywords,
	card-json {
		display: block;
		border: 1px solid #ccc;
		@apply m-3 p-3 overflow-y-auto;
		& h3 {
			@apply text-2xl;
		}
		& h1 {
			@apply text-4xl;
		}
		& h2 {
			@apply flex justify-start;
		}
		& div {
			@apply h-64 overflow-y-auto;
		}
	}

	card-title div:focus-visible,
	card-description div:focus-visible,
	card-keywords div:focus-visible,
	card-json div:focus-visible {
		outline-color: whitesmoke;
		outline-style: outset;
		outline-offset: 1px;
		outline-width: 1px;
	}
</style>
