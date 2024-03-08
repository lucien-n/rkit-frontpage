<script lang="ts">
	import * as Dialog from '$shadcn/dialog';
	import SetProjectForm from '$ui/forms/set-project-form.svelte';

	export let open: boolean = false;
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Title>Create project</Dialog.Title>
		<SetProjectForm />
	</Dialog.Content>
</Dialog.Root>
