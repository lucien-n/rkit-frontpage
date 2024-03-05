<script lang="ts">
	import { urls } from '$lib/urls';
	import { Button } from '$shadcn/button';
	import '../app.pcss';
	import type { LayoutData } from './$types';
	import { ModeWatcher } from 'mode-watcher';

	export let data: LayoutData;

	$: ({ session } = data);
</script>

<ModeWatcher defaultMode="dark" />

{#if session}
	<form method="post" action="{urls.signout}?" class="absolute right-8 top-0">
		<Button type="submit" class="rounded-t-none border-t-0">Sign Out</Button>
	</form>
{/if}

<main class="h-full w-full">
	<slot />
</main>
