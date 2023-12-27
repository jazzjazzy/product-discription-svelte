<script lang="ts">
	/**
     * Crud Component - Used for displaying a quick CRUD page.
     * This component is designed to take a row of data and display it as a form.
     * 
     * IMPORTANT: This component is intended for quick CRUD operations during development.
     * It should not be used in production environments.
     *
     * @example
     * ```svelte
     * <Crud rawData={data.user} id={data.userId} textareas={['description', 'notes']} />
     * ```
     *

    /**
     * Raw data to be displayed and modified in the form. Typically a row from a database.
     * @type {Object}
     */
	export let rawData: any = {};

	/**
	 * Identifier for the data, often the primary key in a database.
	 * @type {any}
	 */
	export let id: any = {};

	/**
	 * Keys in `rawData` to be rendered as textareas.
	 * @type {string[]}
	 * @example ['description', 'notes']
	 */
	export let textareas: string[] = [];

	/**
	 * Keys in `rawData` to be rendered as date inputs.
	 * Currently under development and may not function fully.
	 * @type {string[]}
	 * @example ['created_at', 'updated_at']
	 */
	export let dates: string[] = [];

	/**
	 * Keys in `rawData` to be rendered as date inputs.
	 * Currently under development and may not function fully.
	 * @type {string[]}
	 * @example ['description_json']
	 */
	export let jsonStr: string[] = [];

    /**
	 * Title of form block
	 * @type {string[]}
	 * @example ['title']
	 */
	export let title: string = 'Title';

	const entries = Object.entries(rawData);

	function formatDateForInputField(isoDateString) {
		const date = new Date(isoDateString);
		return date.toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
	}

	function formatTimeForInputField(isoDateString) {
		const time = new Date(isoDateString);
		return time.toISOString().split('T')[1].substring(0, 5); // Converts to 'HH:MM'
	}
</script>

<!-- Component HTML -->
<div class="pt-16 px-3 md:px-16 lg:px-16 xl:px-[32rem]">
	<card-main>
		<card-header>
			<h2 class="h2">{title}</h2>
		</card-header>
		<form method="post">
			<section class="px-12">
				{#each entries as [key, value]}
					<div class="py-4">
						<label class="h4 pb-3 uppercase" for={key}>{key}</label>
						{#if typeof value == 'string'}
							{#if textareas.includes(key)}
								<textarea class="w-full h-32" name={key} id={key}>{value}</textarea>
							{:else}
								<input class="w-full" type="text" name={key} id={key} {value} />
							{/if}
						{/if}
						{#if typeof value == 'number'}
							<input class="w-full" type="number" name={key} id={key} {value} step="any" />
						{/if}
						{#if typeof value == 'boolean'}
							<input class="w-full" type="checkbox" name={key} id={key} {value} />
						{/if}
						{#if typeof value == 'object'}
							{#if dates.includes(key)}
								<div class="grid grid-cols-2">
									<div class="col-span-1">
										<input
											class="w-full"
											type="date"
											id={`date_${key}`}
											name={`date_${key}`}
											value={formatDateForInputField(value)}
										/>
									</div>
									<div class="col-span-1">
										<input
											class="w-1/2"
											type="time"
											id={`time_${key}`}
											name={`time_${key}`}
											value={formatTimeForInputField(value)}
										/>
									</div>
								</div>
							{:else if jsonStr.includes(key)}
								<textarea class="w-full h-32" name={key} id={key}
									>{JSON.stringify(value, null, 2)}</textarea
								>
							{:else}
								<input class="w-full" type="text" name={key} id={key} {value} />
							{/if}
						{/if}
					</div>
				{/each}
			</section>
			<card-footer>
				{#if id}
					<button class="btn variant-ghost-primary m-3" id="btn-update" formaction="?/update"
						>Update</button
					>
					<button class="btn variant-ghost-error m-3" id="btn-delete" formaction="?/delete"
						>Delete</button
					>
					<button class="btn variant-ghost-warning m-3" id="btn-cancel">Cancel</button>
				{:else}
					<button class="btn variant-ghost-primary m-3" id="btn-save" formaction="?/create"
						>Update</button
					>
					<button class="btn variant-ghost-warning m-3" id="btn-cancel">Cancel</button>
				{/if}
			</card-footer>
		</form>
	</card-main>
</div>
<!-- End Component HTML -->
