<script lang="ts">
	import DynamicTextarea from '$lib/components/dynamic-textarea.svelte';
	import { getAction } from '$lib/urls';
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import { signinSchema } from '$shared/modules/auth/schemas/signin.schema';
	import type {
		SetProjectInput,
		SetProjectSchema
	} from '$shared/modules/projects/schemas/set-project.schema';
	import { Plus } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SetProjectSchema>>;
	export let content: SetProjectInput;

	const dispatch = createEventDispatcher();

	const form = superForm(data, {
		validators: zodClient(signinSchema),
		validationMethod: 'oninput',
		onResult: ({ result }) => {
			dispatch(result.type, result);
		}
	});

	const { form: formData, enhance, submitting } = form;

	formData.subscribe((formContent) => (content = formContent));
</script>

<form action={getAction('setProject')} method="POST" class="h-full" use:enhance>
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
	<Form.Field {form} name="description" class="h-full w-full">
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
	<Form.Button class="mb-auto flex w-full gap-2" disabled={$submitting}>
		<Plus />
		Create
	</Form.Button>
</form>
