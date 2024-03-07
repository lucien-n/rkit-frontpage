<script lang="ts">
	import type { PageData } from './$types';
	import SetProjectForm from '$lib/components/set-project-form.svelte';
	import * as Card from '$shadcn/card';
	import ProjectCard from '$lib/components/project-card.svelte';
	import { Separator } from '$shadcn/separator';
	import { Project } from '$shared/modules/projects/project.entity';
	import type { SetProjectInput } from '$shared/modules/projects/schemas/set-project.schema';

	export let data: PageData;

	let content: SetProjectInput;
	let preview: Project = {
		name: 'My Project',
		description: `
### This is a super project
I made it using [sveltekit](https://kit.svelte.dev/) from our lord and savior **Rich Harris** (amen) and [shadcn svelte](https://www.shadcn-svelte.com/) made by the beautifull **Huntabyte**
	`
	} as Project;

	$: {
		if (content?.name) preview.name = content.name;
		if (content?.description) preview.description = content.description;
	}
</script>

<div class="container flex h-full w-full items-center justify-center">
	<div class="flex h-2/3 w-full gap-8">
		<Card.Root class="w-full pt-5 lg:w-2/3">
			<Card.Content>
				<SetProjectForm data={data.form} bind:content />
			</Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
		<Separator orientation="vertical" />
		<ProjectCard project={preview} />
	</div>
</div>
