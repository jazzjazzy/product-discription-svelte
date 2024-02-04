<!-- src/lib/GTag.svelte -->
<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	if (!dev) {
		const GA_ID = 'G-1SH7ZVKRM0'; // Your Google Analytics ID

		onMount(() => {
			// Avoid adding the script multiple times
			if (!window.ga) {
				// Create the script tag for gtag.js
				const script = document.createElement('script');
				script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
				script.async = true;
				document.head.appendChild(script);

				// Initialize the dataLayer and gtag function
				window.dataLayer = window.dataLayer || [];
				window.gtag = function () {
					dataLayer.push(arguments);
				};
				gtag('js', new Date());
				gtag('config', GA_ID);
			}
		});
	}
</script>
