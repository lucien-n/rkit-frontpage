<script lang="ts">
	import AdminNav from '$lib/components/admin-nav.svelte';

	import { Toaster } from '$shadcn/sonner';
	import '../app.pcss';
	import type { LayoutData } from './$types';
	import { ModeWatcher } from 'mode-watcher';

	export let data: LayoutData;

	$: ({ session } = data);
</script>

<ModeWatcher defaultMode="dark" />
<Toaster richColors />

{#if session}
	<AdminNav />
{/if}

<main class="h-full w-full">
	<slot />
</main>
