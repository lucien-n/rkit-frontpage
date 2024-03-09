<script lang="ts">
	import { page } from '$app/stores';
	import { getAction } from '$lib/utils/urls';
	import * as Form from '$shadcn/form';
	import {
		setProjectSchema,
		type SetProjectInput
	} from '$shared/modules/projects/schemas/set-project.schema';
	import Stepper from '$ui/stepper/stepper.svelte';
	import type { Step } from '$ui/stepper/types';
	import { Plus } from 'radix-icons-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import DescriptionTab from './tabs/description-tab.svelte';
	import GithubTab from './tabs/github-tab.svelte';
	import { clickOutside } from '$lib/directives/clickOutside';

	export let open: boolean = false;
	export let project: SetProjectInput | undefined = undefined;

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
		if (project) {
			Object.entries(project).forEach(([key, value]) => {
				if (!value) return;
				$formData[key] = value;
			});
		}
	});

	const steps: Step[] = [
		{
			label: 'Github',
			value: 'github',
			ref: GithubTab,
			props: { form, formData }
		},
		{
			label: 'Description',
			value: 'description',
			ref: DescriptionTab,
			props: { form, formData }
		}
	];

	let currentStep: Step;

	const handleClickOutside = (event: MouseEvent) => {
		if ((event.target as HTMLElement).closest('[data-popover-content]')) return;
		open = false;
	};
</script>

{#if $message}
	<div class="message">{$message}</div>
{/if}

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
		transition:fade={{ duration: 100 }}
	>
		<form
			action={getAction('setProject')}
			method="POST"
			use:enhance
			class="h-2/3 w-11/12 md:w-2/3 2xl:w-2/5"
			use:clickOutside={{ onClickOutside: handleClickOutside }}
		>
			<Stepper {steps} bind:currentStep>
				<svelte:fragment slot="finish">
					<Form.Button class="flex w-full gap-2" disabled={$submitting}>
						<Plus />
						{project ? 'Update' : 'Create'}
					</Form.Button>
				</svelte:fragment>
			</Stepper>
		</form>
	</div>
{/if}
