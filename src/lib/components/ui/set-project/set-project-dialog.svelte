<script lang="ts">
	import { page } from '$app/stores';
	import { getAction } from '$lib/utils/urls';
	import { Button } from '$shadcn/button';
	import * as Card from '$shadcn/card';
	import * as Form from '$shadcn/form';
	import * as Tabs from '$shadcn/tabs';
	import { setProjectSchema } from '$shared/modules/projects/schemas/set-project.schema';
	import { Plus, CaretLeft, CaretRight } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import DescriptionTab from './tabs/description-tab.svelte';
	import GithubTab from './tabs/github-tab.svelte';
	import { clickOutside } from '$lib/directives/clickOutside';

	export let open: boolean = false;

	const dispatch = createEventDispatcher();

	const form = superForm($page.data.setProjectForm, {
		validators: zodClient(setProjectSchema),
		validationMethod: 'oninput',
		onResult: ({ result }) => {
			dispatch(result.type, result);
			if (result.type === 'success') open = false;
		}
	});

	const { form: formData, enhance, submitting, message } = form;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type Tab = { label: string; value: string; ref: any };
	const tabs: Tab[] = [
		{
			label: 'Github',
			value: 'github',
			ref: GithubTab
		},
		{
			label: 'Description',
			value: 'description',
			ref: DescriptionTab
		}
	];

	let currentTabValue = tabs[0].value;
	$: currentTabIndex = tabs.findIndex(({ value }) => value === currentTabValue);
	$: currentTab = tabs[currentTabIndex];

	const handleNextTab = () => {
		if (currentTabIndex === tabs.length - 1) return;
		currentTabValue = tabs[currentTabIndex + 1]?.value;
	};

	const handlePreviousTab = () => {
		if (currentTabIndex === 0) return;
		currentTabValue = tabs[currentTabIndex - 1]?.value;
	};
</script>

{#if $message}
	<div class="message">{$message}</div>
{/if}

<div class="fixed z-[100]">
	<SuperDebug data={form.form} />
</div>

{#if open}
	<div
		class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
		transition:fade={{ duration: 100 }}
	>
		<div class="flex h-full w-full items-center justify-center">
			<Tabs.Root bind:value={currentTabValue} class="h-2/3 w-full md:w-2/3 xl:w-1/3">
				<div class="h-full w-full" use:clickOutside={{ onClickOutside: () => (open = false) }}>
					<Tabs.List class="w-full">
						{#each tabs as { label, value } (value)}
							<Tabs.Trigger {value} class="w-full">{label}</Tabs.Trigger>
						{/each}
					</Tabs.List>
					<div class="my-6" />

					<form action={getAction('setProject')} method="post" class="h-full" use:enhance>
						{#key currentTabIndex}
							<Card.Root class="h-full w-full">
								<div in:fade class="flex h-full w-full flex-col">
									<Card.Header class="text-3xl font-semibold">
										{currentTab.label}
									</Card.Header>
									<Card.Content>
										{#each tabs as { value, ref } (value)}
											<Tabs.Content {value}>
												<svelte:component this={ref} {form} {formData} />
											</Tabs.Content>
										{/each}
									</Card.Content>
									<Card.Footer class="mt-auto flex w-full gap-3">
										{#if currentTabIndex !== 0}
											<Button variant="secondary" class="w-1/3 gap-2" on:click={handlePreviousTab}>
												<span class="mt-[.1rem]">
													<CaretLeft />
												</span>
												Previous
											</Button>
										{/if}

										{#if currentTabValue === tabs[tabs.length - 1].value}
											<Form.Button class="flex w-full gap-2" disabled={$submitting}>
												<Plus />
												Create
											</Form.Button>
										{:else}
											<Button class="ml-auto w-1/3 gap-2" on:click={handleNextTab}>
												Next
												<span class="mt-[.1rem]">
													<CaretRight />
												</span>
											</Button>
										{/if}
									</Card.Footer>
								</div>
							</Card.Root>
						{/key}
					</form>
				</div>
			</Tabs.Root>
		</div>
	</div>
{/if}
