<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import type { Project } from '$shared/modules/projects/project.entity';
	import { ProjectsController } from '$shared/modules/projects/projects.controller';
	import { onMount } from 'svelte';

	let getProjects: Promise<Project[]> | null = null;

	onMount(() => {
		getProjects = ProjectsController.find();
	});
</script>

<div class="flex h-full items-center justify-center">
	{#await getProjects}
		<p>fetching projects</p>
	{:then projects}
		{#each projects ?? [] as project (project.name)}
			<ProjectCard {project} />
		{/each}
	{/await}
</div>
