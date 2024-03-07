<script lang="ts">
	import { Card } from '$shadcn/card';
	import type { Project } from '$shared/modules/projects/project.entity';

	export let project: Project;
</script>

<Card>
	<h1>{project.name}</h1>
	<p>{project.description}</p>
</Card>
