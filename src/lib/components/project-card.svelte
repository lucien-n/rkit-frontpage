<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';
	import SvelteMarkdown from 'svelte-markdown';
	import { renderers } from './marked';
	import ProjectCardToolbar from './project-card-toolbar.svelte';

	export let project: Partial<Project> & Required<Pick<Project, 'id'>>;
</script>

<Card.Root class="h-full w-full">
	<Card.Header class="text-3xl font-bold">{project?.name ?? 'Lorem Ipsum'}</Card.Header>
	<Card.Content>
		<SvelteMarkdown source={project?.description ?? 'Lorem ipsum dolor si amet'} {renderers} />
	</Card.Content>
	<Card.Footer>
		<div class="ml-auto">
			{#if $page.data.session}
				<ProjectCardToolbar {project} />
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
