<script lang="ts">
	import { Textarea } from '$shadcn/textarea';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/shadcn/utils';

	type $$Props = HTMLTextareaAttributes & {
		minRows: number;
	};

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };

	export let minRows: $$Props['minRows'] = 3;
	export let rows: $$Props['rows'] = minRows;

	$: {
		if (typeof value === 'number') {
			rows = minRows;
		}

		if (typeof value === 'object') {
			rows = value?.length;
		}

		if (typeof value === 'string') {
			const contentRows = value?.split('\n').length ?? 0;
			if (contentRows < minRows) {
				rows = minRows;
			} else {
				rows = contentRows;
			}
		}
	}
</script>

<Textarea
	class={cn('min-h-0 w-full resize-none overflow-hidden', className)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
	{rows}
/>
