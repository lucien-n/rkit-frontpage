<script lang="ts">
	import { Link2 } from 'radix-icons-svelte';

	export let href: string;
</script>

<a {href} class="w-fit border-b border-b-transparent font-semibold hover:border-foreground">
	<div class="inline-block">
		<Link2 />
	</div>
	<p class="inline-block"><slot /></p>
</a>
