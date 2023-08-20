<script lang="ts">
	import { checkStringSize } from '$lib/helpers/Utilis';
	import { TabGroup, Tab, AppBar, FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let currentURL = $page.url;
	console.log(currentURL.origin);

	console.log(form);

	let status: boolean | undefined = false;
	let message: string | undefined = '';
	let imageUrl = 'https://storage.googleapis.com/imagebackdrop/bedroom/IMG_5150.JPG';
	let tabSet: number = 0;

	if (form) {
		let { status: statusform, message: messageform } = form;
		if (statusform) {
			imageUrl = `${currentURL.origin}/uploads/${messageform}`;
			handleImageTab();
		}
		status = statusform;
		message = messageform;
		console.log(statusform);
		console.log(messageform);
	}

	let pageDescription = '';
	let divDescription: HTMLDivElement;

	let pageTitle = '';
	let pageTitleCount = 0;
	let divTitle: HTMLDivElement;
	
	let pageKeywords = '';
	let pageDescriptionCount = 0;
	let divKeywords: HTMLDivElement;
	

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
	 * count characters on editable div
	 *
	 * @param event
	 */
	function countChar(event: Event): void {
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

		pageKeywords = checkStringSize(editableText, keywordLength);
	}

	async function handleUpload() {
		const form = document.getElementById('uploadForm') as HTMLFormElement;
		form.submit();
	}

	async function discription() {
		console.log(productDescription);

		let imageDescription: string = '';

		try {
			processing = true;
			buttonString = 'Processing image to Writing Copy...';

			const responseDisc = await fetch('api/replicate/image/discriptor', {
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

			if (responseDisc.ok) {
				const responseData = await responseDisc.json();
				if (responseData.status === 200) {
					imageDescription = responseData.body;
					console.log('Description created successfully.');
					buttonString = 'Getting images Description...';
				} else {
					console.error('Error returned from the server:', responseData.body.message);
				}
			} else {
				console.error('Network error:', responseDisc.status, responseDisc.body);
			}

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

			const res = await responsEtsy.json();
			const { title, description, keywords } = res.body;

			//check if all keywords are less than 20 characters .and mark the ones that are not
			const keywordsChecked = checkStringSize(keywords, keywordLength);

			pageDescriptionCount = description.length;
			pageTitleCount = title.length;

			if (responsEtsy.ok) {
				pageTitle = title;
				pageDescription = description;
				pageKeywords = keywordsChecked;
				clearKeywords = keywords;

				buttonString = 'images Description created successfully.';

				console.log('Description created successfully.');
			} else {
				console.error('Error in returned Description script:', responsEtsy.status);
			}
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
													{#if !status && message !== ''}
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
										<img src={imageUrl} alt="original" class="zoom" />
									{/if}
								{/if}
							</svelte:fragment>
						</TabGroup>
					</div>
					<div class="col-span-1">
						<div class="card p-3">
							<div class="card-header pt-0 px-0"><h3>Shop Description</h3></div>
							<div class="card-body">
								<textarea
									bind:value={storeDescription}
									placeholder="Discribe your shop and what you sell here..."
									class="w-full h-36 p-1 bg-gray-200 border-gray-300 focus:border-gray-400 focus:outline-0 focus:ring-1 rounded-xl"
								/>
							</div>
						</div>
						<div class="card p-3">
							<div class="card-header pt-0 px-0">Product Description</div>
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
								<button on:click={() => copyToClipboard(divTitle)}
									><Icon icon="ph:copy-fill" class="text-2xl" /></button
								>
							</svelte:fragment>
						</AppBar>
						<h1>
							<div
								bind:this={divTitle}
								class="w-full p-3"
								contenteditable="true"
								on:input={countChar}
								data-type="title"
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
								<button on:click={() => copyToClipboard(divDescription)}
									><Icon icon="ph:copy-fill" class="text-2xl" /></button
								>
							</svelte:fragment>
						</AppBar>
						<div
							bind:this={divDescription}
							class="w-full p-3"
							contenteditable="true"
							on:input={countChar}
							data-type="description"
						>
							{@html pageDescription}
						</div>
						<div class="text-xs float-right text-red-500">
							{#if pageDescriptionCount > 0}
								{pageDescriptionCount}
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
								<button on:click={() => copyToClipboard(divKeywords)}
									><Icon icon="ph:copy-fill" class="text-2xl" />
								</button></svelte:fragment
							>
						</AppBar>
						<div
							bind:this={divKeywords}
							class="w-full p-3"
							contenteditable="true"
							on:blur={checkKeywordLength}
						>
							{@html pageKeywords}
						</div>
					</card-keywords>
				</div>
			</div>
		</div>
	</div>
	<div class="lg:col-span-1 w-full h-full">Advertising goes here</div>
</main>

<style>
	card-title,
	card-description,
	card-keywords {
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

	card-keywords {
		@apply h-32;
	}

	.zoom {
		transition: transform 0.2s; /* Animation */
		margin: 0 auto;
	}

	.zoom:hover {
		transform: scale(
			2.5
		); /* (250% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
	}
</style>
