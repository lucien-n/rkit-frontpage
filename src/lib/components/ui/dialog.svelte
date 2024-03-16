<script lang="ts">
	import { fade } from 'svelte/transition';

	export let open: boolean = false;
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
		transition:fade={{ duration: 100 }}
	>
		<slot />
	</div>
{/if}
