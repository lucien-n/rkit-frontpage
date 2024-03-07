<script lang="ts">
	import { cn } from '$lib/shadcn/utils';
	import type { NumericRange } from '@sveltejs/kit';
	import { tv } from 'tailwind-variants';

	export let text: string;
	export let depth: NumericRange<1, 6>;

	const headingSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

	const headingVariants = tv({
		variants: {
			variant: {
				h1: 'text-5xl mb-1 mt-3 font-extrabold',
				h2: 'text-4xl mb-1 mt-3 font-bold',
				h3: 'text-3xl mb-1 mt-3 font-bold',
				h4: 'text-2xl mb-1 mt-2',
				h5: 'text-1xl mb-1 mt-2',
				h6: 'text-lg mb-1 mt-2'
			}
		},
		defaultVariants: {
			variant: 'h1'
		}
	});
</script>

<h1 class={cn(headingVariants({ variant: headingSizes[depth - 1] }))}>{text}</h1>
