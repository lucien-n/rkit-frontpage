<script lang="ts">
	import { page } from '$app/stores';
	import { getAction } from '$lib/urls';
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import { setProjectSchema } from '$shared/modules/projects/schemas/set-project.schema';
	import DynamicTextarea from '$ui/dynamic-textarea.svelte';
	import { Plus } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	const dispatch = createEventDispatcher();

	const form = superForm($page.data.setProjectForm, {
		validators: zodClient(setProjectSchema),
		validationMethod: 'oninput',
		onResult: ({ result }) => {
			dispatch(result.type, result);
		}
	});

	const { form: formData, enhance, submitting, message } = form;
</script>

{#if $message}
	<div class="message">{$message}</div>
{/if}

<form action={getAction('setProject')} method="post" use:enhance>
	<Form.Field {form} name="name" class="w-full">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.name}
				type="text"
				placeholder="Project name"
				class="w-full"
				required
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description" class="w-full">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<DynamicTextarea
				{...attrs}
				bind:value={$formData.description}
				placeholder="Project description"
				class="w-full resize-none overflow-hidden"
				minRows={3}
				required
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<br />
	<Form.Button class="flex w-full gap-2" disabled={$submitting}>
		<Plus />
		Create
	</Form.Button>
</form>
