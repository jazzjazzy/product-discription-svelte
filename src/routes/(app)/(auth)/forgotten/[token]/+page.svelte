<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Reset password</h1>
<form method="post" use:enhance>
	<div class="container py-10 px-4 flex justify-center">
		<card-main class="flex justify-center">
			<card-header>
				<h1>Reset password</h1>
			</card-header>
			<card-body>
				<p>Enter your email address and we'll send you a link to reset your password.</p>
				<form method="post" use:enhance>
					<label for="email">New Password</label>
					<input name="password" id="Password" /><br />
				</form>
			</card-body>
			<card-footer>
				<button type="submit" class="btn-lg variant-filled-primary border">Reset</button>
			</card-footer>
		</card-main>
	</div>
</form>
