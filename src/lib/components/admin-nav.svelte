<script lang="ts">
	import { urls } from '$lib/utils/urls';
	import { Button } from '$shadcn/button';
	import SetProjectDialog from '$ui/set-project/set-project-dialog.svelte';
	import { Exit, Home, Plus } from 'radix-icons-svelte';

	let openSetDialog: boolean = false;
</script>

<div class="absolute left-1/2 top-0 -translate-x-1/2 transform">
	<div class="flex h-fit w-fit gap-3 p-3">
		<Button variant="outline" href={urls.home} size="icon"><Home /></Button>
		<Button variant="outline" on:click={() => (openSetDialog = !openSetDialog)} class="flex gap-2"
			><Plus /> New</Button
		>
		<form method="post" action="{urls.signout}?">
			<Button variant="outline" type="submit" size="icon"><Exit /></Button>
		</form>
	</div>
</div>

<SetProjectDialog bind:open={openSetDialog} />
