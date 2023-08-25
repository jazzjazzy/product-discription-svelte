<script lang="ts">
	import { formateKeywordstring } from '$lib/helpers/Utilis';
	import { TabGroup, Tab, AppBar, FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
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
	let imageUrl = 'https://storage.googleapis.com/imagebackdrop/bedroom/IMG_5150.JPG';
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

	function newlineToBreak(text: string) {
		return text.replace(/\n/g, '<br>');
	}

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
			// const responseDisc = await fetch('api/replicate/image/discriptor', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify({
			// 		imageUrl: imageUrl,
			// 		productDescription: productDescription,
			// 		storeDescription: storeDescription
			// 	})
			// });

			// if (responseDisc.ok) {
			// 	const responseData = await responseDisc.json();
			// 	if (responseData.status === 200) {
			// 		imageDescription = responseData.body;
			// 		console.log('Description created successfully.');
			// 		buttonString = 'Getting images Description...';
			// 	} else {
			// 		console.error('Error returned from the server:', responseData.body.message);
			// 	}
			// } else {
			// 	console.error('Network error:', responseDisc.status, responseDisc.body);
			// }

			imageDescription =
				'The wooden dice tower has a sleek and modern design, with a blue felt lining the inside of the tray. The tower is made of cherry wood, which gives it a warm and natural look. The tray is large enough to hold several dice at once, making it easy to play games with multiple players. The tower is also lightweight and easy to move around, making it a great addition to any game night.';

			/****
			 *
			 * GET ETSY DESCRIPTION FROM OPENAI
			 *
			 */
			console.log('Json data sent to OpenAI:');
			const responsEtsy = await fetch('api/replicate/image/etsy', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					imageDescription: imageDescription,
					productDescription: productDescription,
					storeDescription: storeDescription
				})
			});
			console.log('responseData', responsEtsy);
			if (responsEtsy.ok) {
				pageTitleCount = 0;
				pageDescriptionCount = 0;

				console.log('Etsy description created successfully.');
				try {
					const data = responsEtsy.body;
					if (!data) {
						return;
					}

					const reader = data.getReader();
					const decoder = new TextDecoder();
					let currFiels = '';

					pageTitle = '';
					pageDescription = '';
					pageKeywords = '';
					etsyResponse = '';
					isEditable = false;

					while (true) {
						const { value, done } = await reader.read();
						let chunkValue = decoder.decode(value);

						console.log('chunkValue', chunkValue);

						//console.log(chunkValue);
						etsyResponse += chunkValue;

						if (chunkValue == `Title` || chunkValue.trim() == `Title:`) {
							currFiels = 'title';
							chunkValue = '';
						} else if (chunkValue == 'Description' || chunkValue.trim() == 'Description:') {
							currFiels = 'description';
							chunkValue = '';
						} else if (chunkValue == 'Keywords' || chunkValue.trim() == 'Keywords:') {
							currFiels = 'keywords';
							chunkValue = '';
						}

						chunkValue = chunkValue.replace(/"|}|{|:|'''|`/g, '');

						//console.log('currFiels', currFiels);
						if (currFiels === 'title') {
							pageTitle += chunkValue;
						} else if (currFiels === 'description') {
							//chunkValue = chunkValue.replace(/\n/g, '<br />');
							pageDescription += chunkValue;
						} else if (currFiels === 'keywords') {
							pageKeywords += chunkValue;
						}

						if (done) {
							clearKeywords = pageKeywords;
							pageKeywords = formateKeywordstring(pageKeywords, keywordLength);
							titleAndDescriptionLength();
							isEditable = true;
							endStream = true;
							break;
						}
					}
				} catch (err) {
					error = 'Looks like OpenAI timed out :(';
				}
			} else {
				error = await responsEtsy.text();
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
</script>

<main class="lg:grid lg:grid-cols-5 main">
	<div class="lg:col-span-1 w-full h-full">Advertising goes here</div>
	<div class="p-7 col-span-5 lg:col-span-3">
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
										<img src={imageUrl} alt="original" />
									{/if}
								{/if}
							</svelte:fragment>
						</TabGroup>
					</div>
					<div class="col-span-1">
						<div class="card p-3">
							<div class="card-header pt-0 px-0">
								<h3 class="pl-3 pb-2 font-semibold text-lg">Shop Description</h3>
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
								<h3 class="pl-3 pb-2 font-semibold text-lg">Product Description</h3>
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
							<h2 class="text-2xl">Title</h2>
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
							<h2 class="text-2xl">Description</h2>
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
							<h2 class="text-2xl">Keywords</h2>
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
							<h2 class="text-2xl">Json output</h2>
							<svelte:fragment slot="trail">
								{#if isEditable}
									<copyContentToClipBoard element="pageJson" />
								{/if}
							</svelte:fragment>
						</AppBar>
						<div class="w-full p-3">
							<pre id="json" data-clipboard="pageJson">{@html etsyResponse}</pre>
						</div>
					</card-json>
				</div>
			</div>
		</div>
	</div>
	<div class="lg:col-span-1 w-full h-full">Advertising goes here</div>
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
		& div {
			@apply h-64 overflow-y-auto;
		}
	}
</style>
