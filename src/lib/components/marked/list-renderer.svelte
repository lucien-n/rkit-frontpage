<script lang="ts">
	import type { ListItem } from './types';

	export let ordered: boolean;
	export let raw: string;
	export let start: number;
	export let loose: boolean;
	export let items: ListItem[];

	$: console.table({ component: 'list', ordered, raw, start, loose });
	$: console.log(items);
</script>

<ul>
	{#each items as item, index}
		<div class="ml-2 flex gap-1">
			{ordered ? index : '●'}
			<p>{item.text}</p>
		</div>
	{/each}
</ul>
