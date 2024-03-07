<script lang="ts">
	import * as Card from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';
	import SvelteMarkdown from 'svelte-markdown';
	import { renderers } from './marked';

	export let project: Project;

	const placeholder = `
### Overview
A dynamic listing website built with SvelteKit for browsing and searching various listings like products, services, or classified ads.

### Features
- Responsive Design
- Dynamic Filtering
- User Authentication
- Admin Dashboard
- Search Functionality
- Interactive Maps
- Social Sharing
- Customizable Templates
- SEO Optimization

### Technologies
- SvelteKit
- Tailwind CSS
- Firebase
- Mapbox
- Algolia
- GitHub Actions

### Status
In development. Expected launch: [Month, Year].`;
</script>

<Card.Root class="h-fit w-full lg:w-2/3">
	<Card.Header class="text-3xl font-bold">{project.name ?? 'Lorem Ipsum'}</Card.Header>
	<Card.Content>
		<SvelteMarkdown source={project.description ?? placeholder} {renderers} />
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
