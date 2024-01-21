<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<form method="post" use:enhance >
	<div class="py-10 px-4 flex justify-center">
		<card-main class="flex justify-center">
			<card-header>
				<h1>Email Verification</h1>
			</card-header>
			<card-body class="py-4">
				<p>Your account has not been verified, Your email verification link was sent to your inbox.</p>
				<p>If you can not find it, you can use the resend button below to send new verification Link</p>
				<h2 class="mt-4">Resend verification link</h2>
			</card-body>
			<card-footer class="flex justify-center">
				<input type="submit" value="Resend" class="btn-lg variant-filled-primary border" />
			</card-footer>
		</card-main>
	</div>
</form>
