<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { getAction } from '$lib/utils/urls';
	import { setProjectSchema } from '$shared/modules/projects/schemas/set-project.schema';
	import type { SetTagInput } from '$shared/modules/tags/schemas/set-tag.schema';
	import Dialog from '$ui/dialog.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import { Plus } from 'radix-icons-svelte';

	export let open: boolean = false;
	export let tag: SetTagInput | undefined = undefined;

	const dispatch = createEventDispatcher();

	const form = superForm($page.data.setProjectForm, {
		validators: zodClient(setProjectSchema),
		validationMethod: 'oninput',
		onResult: ({ result }) => {
			dispatch(result.type, result);
			if (result.type === 'success') open = false;
			if (result.type === 'error') toast.error('An error occured');
		}
	});

	const { form: formData, enhance, submitting, message } = form;

	onMount(() => {
		if (tag) {
			Object.entries(tag).forEach(([key, value]) => {
				if (!value) return;
				$formData[key] = value;
			});
		}
	});

	const handleClickOutside = (event: MouseEvent) => {
		if ((event.target as HTMLElement).closest('[data-popover-content]')) return;
		open = false;
	};
</script>

{#if $message}
	<div class="message">{$message}</div>
{/if}

<Dialog bind:open>
	<form
		action={getAction('setProject')}
		method="POST"
		use:enhance
		class="h-2/3 w-11/12 md:w-2/3 2xl:w-2/5"
		use:clickOutside={{ onClickOutside: handleClickOutside }}
	>
		<Form.Field {form} name="label" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Label</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.label}
					type="text"
					placeholder="Tag label"
					class="w-full"
					required
				/>
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button class="flex w-full gap-2" disabled={$submitting}>
			<Plus />
			{tag ? 'Update' : 'Create'}
		</Form.Button>
	</form>
</Dialog>
