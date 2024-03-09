<script lang="ts">
	import { page } from '$app/stores';
	import AdminNav from '$lib/components/admin-nav.svelte';
	import { Toaster } from '$shadcn/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { fly } from 'svelte/transition';
	import '../app.pcss';
	import type { LayoutData } from './$types';
	import Nav from '$lib/components/nav.svelte';

	export let data: LayoutData;

	$: ({ session } = data);
</script>

<ModeWatcher defaultMode="dark" />
<Toaster richColors />

{#if session}
	<AdminNav />
{:else}
	<Nav />
{/if}

<div class="absolute left-0 top-0 m-1 font-bold text-muted-foreground">In dev</div>

{#key $page.url.pathname}
	<main in:fly={{ duration: 200, y: -200 }} class="h-full w-full">
		<slot />
	</main>
{/key}
