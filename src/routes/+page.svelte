<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import ProjectCardSkeleton from '$lib/components/project-card-skeleton.svelte';
	import ProjectCard from '$lib/components/project-card.svelte';
	import { cn } from '$lib/shadcn/utils';
	import { remlive } from '$lib/utils/remlive';
	import { Button } from '$shadcn/button';
	import { Project } from '$shared/modules/projects/project.entity';
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';
	import { remult } from 'remult';

	let projects = remlive(remult.repo(Project), []);
	let showHidden = false;

	$: browser &&
		projects.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true },
			where: { hidden: showHidden },
			limit: 25
		});

	const getColSpan = (index: number) =>
		['col-span-3', 'col-span-4', 'col-span-4', 'col-span-3'][index % 4];
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	{#if $page.data.session}
		<div class="mb-5">
			<Button on:click={() => (showHidden = !showHidden)} variant="outline" class="flex gap-2">
				{#if showHidden}
					<EyeClosed />
					Hide hidden
				{:else}
					<EyeOpen />
					Show hidden
				{/if}
			</Button>
		</div>
	{/if}
	<div class="grid h-2/3 w-2/3 grid-cols-7 grid-rows-3 gap-5">
		{#if $projects.length}
			{#each $projects as project, index (project.id)}
				<article class={cn('h-full', getColSpan(index))}>
					<ProjectCard {project} />
				</article>
			{/each}
		{:else}
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each { length: 6 } as _, index}
				<article class={cn('h-full', getColSpan(index))}>
					<ProjectCardSkeleton />
				</article>
			{/each}
		{/if}
	</div>
</div>
