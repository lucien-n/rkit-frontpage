<script lang="ts">
	import type { Project } from '$shared/modules/projects/project.entity';
	import { remtry } from '$lib/utils/remtry';
	import { ProjectsController } from '$shared/modules/projects/projects.controller';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$shadcn/alert-dialog';
	import { Button, buttonVariants } from '$shadcn/button';
	import { EyeClosed, Pencil1, Trash } from 'radix-icons-svelte';
	import SetProjectDialog from '$ui/set-project/set-project-dialog.svelte';

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

	const toggleHide = () => {
		remtry(
			async () => {
				if (!project?.id) return;
				await ProjectsController.set({ hidden: true }, project.id);
			},
			() => toast.success(`"${project?.name ?? project.id}" is now hidden`),
			() => toast.error(`Couldn't hide "${project?.name ?? project.id}"`)
		);
	};

	let openSetProjectDialog = false;
</script>

<div class="absolute right-0 top-0 z-20 hidden gap-1 p-1 transition-all group-hover:flex">
	<Button variant="outline" size="icon" on:click={() => (openSetProjectDialog = true)}>
		<Pencil1 />
	</Button>

	<Button variant="outline" size="icon" on:click={toggleHide}>
		<EyeClosed />
	</Button>

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
</div>

<SetProjectDialog {project} bind:open={openSetProjectDialog} />
