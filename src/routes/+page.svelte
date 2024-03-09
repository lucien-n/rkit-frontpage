<script lang="ts">
	import { browser } from '$app/environment';
	import ProjectCardSkeleton from '$lib/components/project-card-skeleton.svelte';
	import ProjectCard from '$lib/components/project-card.svelte';
	import { cn } from '$lib/shadcn/utils';
	import { remlive } from '$lib/utils/remlive';
	import { Project } from '$shared/modules/projects/project.entity';
	import { remult } from 'remult';

	let projects = remlive(remult.repo(Project), []);

	$: browser &&
		projects.listen({
			orderBy: { createdAt: 'asc' },
			include: { author: true },
			where: { hidden: false },
			limit: 25
		});

	const getColSpan = (index: number) =>
		['col-span-1', 'col-span-2', 'col-span-2', 'col-span-1'][index % 4];
</script>

<div class="flex h-full w-full items-center justify-center">
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
