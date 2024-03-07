<script lang="ts">
	import * as Card from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';
	import SvelteMarkdown from 'svelte-markdown';
	import { renderers } from './marked';

	export let project: Project;

	const placeholder = `
## Overview
A dynamic listing website built with [SvelteKit](https://kit.svelte.dev/) for browsing and searching various listings like products, services, or classified ads.

## Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Dynamic Filtering**: Easily filter listings by category, price, location, and more.
- **User Authentication**: Register, login, and manage listings securely.
- **Admin Dashboard**: Manage listings, users, and site settings.
- **Search Functionality**: Powerful search engine with advanced filters.
- **Interactive Maps**: Visualize listings on interactive maps with location data.
- **Social Sharing**: Share listings on social media platforms.
- **Customizable Templates**: Customize templates and components for branding.
- **SEO Optimization**: Improve visibility with built-in SEO features.

## Technologies
- [SvelteKit](https://kit.svelte.dev/): Frontend framework
- [Tailwind CSS](https://tailwindcss.com/): CSS framework
- [Firebase](https://firebase.google.com/): Backend services
- [Mapbox](https://www.mapbox.com/): Mapping platform
- [Algolia](https://www.algolia.com/): Search-as-a-Service platform
- [GitHub Actions](https://github.com/features/actions): CI/CD pipeline

## Status
In development. Expected launch: [Month, Year].
`;
</script>

<Card.Root class="h-fit w-full lg:w-2/3">
	<Card.Header class="text-3xl font-bold">{project.name ?? 'Lorem Ipsum'}</Card.Header>
	<Card.Content>
		<SvelteMarkdown source={project.description ?? placeholder} {renderers} />
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
