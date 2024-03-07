<script lang="ts">
	import * as Card from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';
	import SvelteMarkdown from 'svelte-markdown';
	import { renderers } from './marked';

	export let project: Project;
</script>

<Card.Root class="h-fit w-full lg:w-2/3">
	<Card.Header class="text-3xl font-bold">{project.name ?? 'Lorem Ipsum'}</Card.Header>
	<Card.Content>
		<SvelteMarkdown source={project.description ?? 'Lorem ipsum dolor si amet'} {renderers} />
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
