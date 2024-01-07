<script lang="ts">
	import { formateKeywordstring } from '$lib/helpers/Utilis';
	import { TabGroup, Tab, FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import Icon from '@iconify/svelte';
	//local components
	import InputProduct from '$lib/components/dashboard/inputs/inputProduct.svelte';
	import InputStore from '$lib/components/dashboard/inputs/inputStore.svelte';
	import TemperatureSlider from '$lib/components/dashboard/inputs/tempSlider.svelte';
	import TextSizeSlider from '$lib/components/dashboard/inputs/textSizeSlider.svelte';
	import ResultsTitle from '$lib/components/dashboard/results/resultTitle.svelte';
	import ResultsDescription from '$lib/components/dashboard/results/resultsDescription.svelte';
	import ResultsKeywords from '$lib/components/dashboard/results/resultKeywords.svelte';
	import ResultsJson from '$lib/components/dashboard/results/resultJson.svelte';
	import FailWarning from '$lib/components/failWarning.svelte';

	export let data: PageData;
	export let form: ActionData;

	let monthlyLimit = data.monthlyLimit;

	let errorImage: string | null = null;
	let errorStoreDesc: string | null = null;
	let errorProductDesc: string | null = null;

	let sessionId = data.session;
	let plan = data.plan;

	let temperature = 0.2; // Default value for the slider
	let charatorCount = 500; // Default value for the slider

	let loading = false;

	let success: boolean = false;
	let message: string = '';

	let imageUrl: string = '';
	let tabSet: number = 0;

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
	//let productDescription = '';
	//let storeDescription = '';
	let productDescription =
		'This is a dice tower with an inbuilt tray made from cherry wood and lined with a blue felt';
	let storeDescription =
		'we are a store that sells equipment for board games, dice games and role-playing games, we sell dice towers and dice trays hand-made from exotic wood species ';

	let imageIsUpload = false;

	/**
	 * isUplaod
	 *
	 * @param isUpload true if image is uploaded and false if image is linked
	 */
	function handleImageTab(isUpload: boolean) {
		if (imageUrl) {
			tabSet = 2;
			imageIsUpload = isUpload;
		}
	}

	if (form) {;
		let { success: statusform, message: messageform, url: urlform, type } = form;
		if (statusform && urlform) {
			imageUrl = urlform;
			handleImageTab(true);
		}
		success = statusform;
		message = messageform;
		type = type;
	}

	/**
	 * @type {string}
	 */
	let searchResponse = '';
	/**
	 * @type {Array<string | {title: string, description: string}>}
	 */
	let recommendations = [];

	async function handleUpload() {
		const form = document.getElementById('uploadForm') as HTMLFormElement;
		form.submit();
	}

	async function handleImage(isUpload: boolean) {
		if (imageUrl) {
			if (typeof window !== 'undefined') {
				const form = document.getElementById('autoSubmitForm') as HTMLFormElement;
				form.submit();
				handleImageTab(true);
			}
		}
	}

	/**
	 * @param {string} url
	 * @returns {Promise<string>}
	 */
	async function generateProductDiscription() {
		if (loading) return;

		//reset errors
		errorImage = null;
		errorStoreDesc = null;
		errorProductDesc = null;

		let hasError = false;

		if (!imageUrl) {
			errorImage =
				'Please upload or add Url of an image that requires a discription to be generated';
			hasError = true;
		}

		if (!storeDescription) {
			errorStoreDesc = 'Please enter a store description to help expand on the product description';
			hasError = true;
		}

		if (!productDescription) {
			errorProductDesc =
				'Please enter a product description to help us to detemine the products style, features and benefits';
			hasError = true;
		}

		if (hasError) return;

		loading = true;

		isEditable = false;
		pageTitle = '';
		pageDescription = '';
		pageKeywords = '';
		pageJson = '';
		pageTitleCount = 0;
		pageDescriptionCount = 0;

		try {
			processing = true;
			buttonString = 'Processing image to Writing Copy...';

			const responseDisc = await fetch('api/discriptor', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					imageUrl,
					imageType,
					productDescription,
					storeDescription,
					temperature,
					charatorCount,
					token: sessionId,
					plan: plan
				})
			});

			const { status, body } = await responseDisc.json();

			if (status === 200) {
				//const { results } = JSON.parse(body);
				const { product_title, product_description, product_keywords } = body.etsyDescription;
				monthlyLimit = body.monthlyLimit;

				// count characters for title and description
				pageDescriptionCount = product_description.length;
				pageTitleCount = product_title.length;

				pageTitle = product_title;
				pageDescription = product_description;
				pageKeywords = formateKeywordstring(product_keywords, keywordLength);
				clearKeywords = product_keywords;

				pageJson = JSON.stringify(body, null, 4);

				//set to editable as we have a result
				isEditable = true;

				buttonString = 'images Description created successfully.';
				console.log('Description created successfully.');
			}

			loading = false;
		} catch (error) {
			console.error('Error Description script:', error);
		}

		processing = false;
		buttonString = 'Write New Copy';
	}
</script>

<main class="main">
	<div class="px-7">
		<div class="card">
			<div class="card-header p-6 mb-6 border-b-orange-500 border-b-2">
				<h1 class="text-4xl">Dis.cription Assistant</h1>
			</div>
			<div class="cardbody px-5 pb-10">
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
												<form id="autoSubmitForm" method="post" action="?/imageUrl" use:enhance>
													<input
														type="text"
														name="imageUrl"
														class="w-full mt-3 px-3 rounded-lg border-sky-100 border-black"
														bind:value={imageUrl}
														on:change={handleImage(false)}
														placeholder="https:// Enter image url"
													/>
												</form>
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
						<InputStore bind:storeDescription {sessionId} {plan} />
						<InputProduct bind:productDescription />
						{#if plan === 'Pro' || plan === 'Ultra'}
							<div class="grid grid-cols-2">
								<div class="col-span-1 p-3 slider-container">
									<TemperatureSlider bind:temperature />
								</div>
								<div class="col-span-1 p-3 slider-container">
									<TextSizeSlider bind:charatorCount />
								</div>
							</div>
						{/if}
					</div>
				</div>
				<div class="w-full">
					{#if errorImage}
						<FailWarning
							errorMessage={'Please upload or add Url of an <strong>Image</strong> that requires a discription to be generated.'}
						/>
					{/if}
					{#if errorStoreDesc}
						<FailWarning
							errorMessage={'Please enter a <strong>Store Description</strong> to help expand on the product description'}
						/>
					{/if}
					{#if errorProductDesc}
						<FailWarning
							errorMessage={'Please enter a <strong>Product Description</strong> to help us to detemine the product style features and benefits'}
						/>
					{/if}
				</div>

				<div class="w-full">
					{#if !monthlyLimit}
						<div class="flex justify-center">
							<button
								class="btn variant-filled my-2 w-4/6 text-fuchsia-400"
								on:click={generateProductDiscription}
							>
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
					{:else if !plan}
						<div class="flex justify-center text-center p-6">
							<div class="border border-amber-500 rounded-md bg-amber-100 p-3">
								<p class="mb-6">
									You have reached your monthly limit of <strong>3</strong> description per Month, to
									continue please upgrade to a payed account
								</p>
								<a href="/pricing" class="btn variant-filled-primary rounded-md">Purchase Account</a
								>
							</div>
						</div>
					{:else if plan == 'Nano'}
						<div class="flex justify-center text-center">
							<div class="w-1/2 border border-slate-500 rounded-md bg-red-100 p-3">
								<p class="mb-6">
									You have reached your monthly limit of <strong>10</strong> description per Month, to
									continue please upgrade to a Pro or Ultra account
								</p>
								<a href="/pricing" class="btn variant-filled-primary rounded-md">Purchase Account</a
								>
							</div>
						</div>
					{:else if plan == 'Pro'}
						<div class="flex justify-center text-center">
							<div class="w-1/2 border border-slate-500 rounded-md bg-red-100 p-3">
								<p class="mb-6">
									You have reached your monthly limit of <strong>3</strong> description per Month, to
									continue please upgrade to a Ultra account
								</p>
								<a href="/pricing" class="btn variant-filled-primary rounded-md">Purchase Account</a
								>
							</div>
						</div>
					{/if}
					<card-title>
						<ResultsTitle {isEditable} {divTitle} {pageTitle} {pageTitleCount} />
					</card-title>
					<card-description>
						<ResultsDescription
							{isEditable}
							{divDescription}
							{pageDescription}
							{pageDescriptionCount}
						/>
					</card-description>
					<card-keywords>
						<ResultsKeywords {isEditable} {divKeywords} {pageKeywords} {clearKeywords} />
					</card-keywords>
					<card-json>
						<ResultsJson {isEditable} {pageJson} />
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
		@apply m-3 overflow-y-auto p-3;
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

	.dialog-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dialog-content {
		background: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
</style>
