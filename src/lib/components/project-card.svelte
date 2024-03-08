<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$shadcn/button';
	import * as Card from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';
	import { Trash } from 'radix-icons-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { renderers } from './marked';
	import { remtry } from '$lib/remtry';
	import { ProjectsController } from '$shared/modules/projects/projects.controller';
	import { toast } from 'svelte-sonner';

	export let project: Partial<Project>;

	const handleDelete = async () => {
		remtry(
			async () => {
				if (!project?.id) return;
				await ProjectsController.delete(project.id);
			},
			() => toast.success(`Successfully delete "${project?.name ?? project.id}"`),
			() => toast.error(`Couldn't delete "${project?.name ?? project.id}"`)
		);
	};
</script>

<Card.Root class="h-full w-full">
	<Card.Header class="text-3xl font-bold">{project?.name ?? 'Lorem Ipsum'}</Card.Header>
	<Card.Content>
		<SvelteMarkdown source={project?.description ?? 'Lorem ipsum dolor si amet'} {renderers} />
	</Card.Content>
	<Card.Footer>
		<div class="ml-auto">
			{#if $page.data.session}
				<Button variant="destructive" size="icon" on:click={handleDelete}><Trash /></Button>
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
