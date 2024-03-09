<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';
	import SvelteMarkdown from 'svelte-markdown';
	import { renderers } from './marked';
	import ProjectCardToolbar from './project-card-toolbar.svelte';
	import { buttonVariants } from '$shadcn/button';
	import { cn } from '$lib/shadcn/utils';
	import { ExternalLink } from 'radix-icons-svelte';

	export let project: Partial<Project> & Required<Pick<Project, 'id'>>;
</script>

<Card.Root class="group relative h-full w-full transition-all ease-in-out  hover:shadow-md">
	{#if $page.data.session}
		<ProjectCardToolbar {project} />
	{/if}
	<Card.Header class="text-3xl font-bold">
		{#if project.url}
			<a
				class={cn(buttonVariants({ variant: 'link' }), `w-fit gap-2 px-0 text-3xl font-bold`)}
				href={project.url}
			>
				{project?.name ?? 'Lorem Ipsum'}
				<ExternalLink size={20} />
			</a>
		{:else}
			{project?.name ?? 'Lorem Ipsum'}
		{/if}
	</Card.Header>
	<Card.Content>
		<SvelteMarkdown source={project?.description ?? 'Lorem ipsum dolor si amet'} {renderers} />
	</Card.Content>
</Card.Root>
