<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>


<!-- in src/routes/checkout/+page.svelte -->
<h1>Checkout</h1>

<!-- posts to default form action -->
<form method="post">
  <input name="name" required placeholder="Name" />
  <input name="email" type="email" required placeholder="E-mail" />

  <button>Continue</button>
</form>
