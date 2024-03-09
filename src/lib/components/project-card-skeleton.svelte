<script lang="ts">
	import * as Card from '$shadcn/card';
	import { Skeleton } from '$shadcn/skeleton';
</script>

<Card.Root class="relative h-full w-full">
	<Card.Header class="text-3xl font-bold">
		<Skeleton class="h-7 w-48" />
	</Card.Header>
	<Card.Content class="flex flex-col gap-3">
		<Skeleton class="h-4 w-72" />
		<Skeleton class="h-4 w-36" />
	</Card.Content>
</Card.Root>
