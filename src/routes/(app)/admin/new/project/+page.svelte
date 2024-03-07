<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import SetProjectForm from '$lib/components/set-project-form.svelte';
	import * as Card from '$shadcn/card';
	import { Separator } from '$shadcn/separator';
	import type { SetProjectInput } from '$shared/modules/projects/schemas/set-project.schema';
	import { writable, type Writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	let content: Writable<SetProjectInput> = writable();
</script>

<div class="container flex h-full w-full items-center justify-center">
	<div class="flex h-2/3 w-full gap-8">
		<Card.Root class="w-full pt-5 lg:w-2/3">
			<Card.Content>
				<SetProjectForm data={data.form} bind:content={$content} />
			</Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
		<Separator orientation="vertical" />
		<ProjectCard project={$content} />
	</div>
</div>
