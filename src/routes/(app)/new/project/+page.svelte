<script lang="ts">
	import type { PageData } from './$types';
	import SetProjectForm from './set-project-form.svelte';
	import * as Card from '$shadcn/card';
	import ProjectCard from '$lib/components/project-card.svelte';
	import { Separator } from '$shadcn/separator';
	import { Project } from '$shared/modules/projects/project.entity';

	export let data: PageData;

	let preview: Project = {} as Project;
</script>

<div class="container flex h-full w-full items-center justify-center">
	<div class="flex h-2/3 w-full gap-8">
		<Card.Root class="w-full pt-5 lg:w-2/3">
			<Card.Content>
				<SetProjectForm data={data.form} />
			</Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
		<Separator orientation="vertical" />
		<ProjectCard project={preview} />
	</div>
</div>
