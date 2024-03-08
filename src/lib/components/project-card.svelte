<script lang="ts">
	import { page } from '$app/stores';
	import { remtry } from '$lib/utils/remtry';
	import * as AlertDialog from '$shadcn/alert-dialog';
	import { buttonVariants } from '$shadcn/button';
	import * as Card from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';
	import { ProjectsController } from '$shared/modules/projects/projects.controller';
	import { Trash } from 'radix-icons-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';
	import { renderers } from './marked';

	export let project: Partial<Project> & Required<Pick<Project, 'id'>>;

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
				<AlertDialog.Root>
					<AlertDialog.Trigger>
						<button class={buttonVariants({ variant: 'destructive', size: 'icon' })}>
							<Trash />
						</button>
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>
								Delete <strong>{project?.name ?? project.id}</strong>?
							</AlertDialog.Title>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action on:click={handleDelete}>Confirm</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
