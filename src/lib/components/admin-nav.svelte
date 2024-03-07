<script lang="ts">
	import { urls } from '$lib/urls';
	import { Button } from '$shadcn/button';
	import { Exit, Home, Plus } from 'radix-icons-svelte';
</script>

<div class="absolute left-1/2 top-0 -translate-x-1/2 transform">
	<div class="flex h-fit w-fit gap-3 p-3">
		<Button href={urls.home} size="icon"><Home /></Button>
		<Button href={urls.newProject} class="flex gap-2"><Plus /> New</Button>
		<form method="post" action="{urls.signout}?">
			<Button type="submit" size="icon"><Exit /></Button>
		</form>
	</div>
</div>
