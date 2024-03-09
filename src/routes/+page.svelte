<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import { cn } from '$lib/shadcn/utils';
	import type { Project } from '$shared/modules/projects/project.entity';
	import { ProjectsController } from '$shared/modules/projects/projects.controller';
	import { onMount } from 'svelte';

	let getProjects: Promise<Project[] | undefined>;

	onMount(() => {
		getProjects = ProjectsController.find({ where: { hidden: false } });
	});
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="grid h-2/3 w-2/3 grid-cols-7 grid-rows-3 gap-5">
		{#await getProjects}
			<p>fetching projects</p>
		{:then projects}
			{#each projects ?? [] as project, index (project.id)}
				<article class={cn('h-full', index % 3 == 0 ? 'col-span-4' : 'col-span-3')}>
					<ProjectCard {project} />
				</article>
			{/each}
		{/await}
	</div>
</div>
