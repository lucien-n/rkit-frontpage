<script lang="ts">
	import type { SetProjectInput } from '$shared/modules/projects/schemas/set-project.schema';
	import type { SuperForm } from 'sveltekit-superforms';
	import { Input } from '$shadcn/input';
	import DynamicTextarea from '$ui/dynamic-textarea.svelte';
	import * as Form from '$shadcn/form';

	export let form: SuperForm<SetProjectInput>;

	const { form: formData } = form;
</script>

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
