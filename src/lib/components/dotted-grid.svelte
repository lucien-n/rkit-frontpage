<script lang="ts">
	import { cn } from '$lib/shadcn/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div
	class={cn(
		'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex h-full w-full items-center justify-center bg-white dark:bg-black',
		className
	)}
>
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
	></div>
	<p
		class="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl"
	>
		<slot />
	</p>
</div>
