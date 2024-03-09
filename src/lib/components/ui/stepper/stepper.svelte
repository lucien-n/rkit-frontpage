<script lang="ts">
	import { cn } from '$lib/shadcn/utils';
	import { Button } from '$shadcn/button';
	import * as Card from '$shadcn/card';
	import * as Tabs from '$shadcn/tabs';
	import { CaretLeft, CaretRight } from 'radix-icons-svelte';
	import type { Step } from './types';

	export let steps: Step[];
	export let currentStep: Step;
	export let value: string = '';

	let className: string = '';
	export { className as class };

	$: currentStep = steps.find((step) => step.value === value) ?? steps[0];
	$: currentStepIndex = steps.findIndex((step) => step.value === currentStep.value);

	const handleNextStep = () => {
		if (currentStepIndex === steps.length - 1) return;
		value = steps[currentStepIndex + 1]?.value;
	};

	const handlePreviousStep = () => {
		if (currentStepIndex === 0) return;
		value = steps[currentStepIndex - 1]?.value;
	};
</script>

<Tabs.Root bind:value class={cn('h-full w-full', className)}>
	<div class="h-full w-full">
		<Tabs.List class="w-full">
			{#each steps as { value, label } (value)}
				<Tabs.Trigger {value} class="w-full">{label}</Tabs.Trigger>
			{/each}
		</Tabs.List>

		<div class="my-6" />

		<Card.Root class="flex h-full w-full flex-col">
			<Card.Header class="text-3xl font-semibold">
				{currentStep.label}
			</Card.Header>
			<Card.Content>
				{#each steps as { value, ref, props } (value)}
					<Tabs.Content {value}>
						<svelte:component this={ref} {...props} />
					</Tabs.Content>
				{/each}
			</Card.Content>

			<Card.Footer class="mt-auto flex w-full gap-3">
				{#if currentStepIndex !== 0}
					<Button variant="secondary" class="w-1/3 gap-2" on:click={handlePreviousStep}>
						<span class="mt-[.1rem]">
							<CaretLeft />
						</span>
						Previous
					</Button>
				{/if}

				{#if currentStep.value === steps[steps.length - 1].value}
					<slot name="finish" />
				{:else}
					<Button class="ml-auto w-1/3 gap-2" on:click={handleNextStep}>
						Next
						<span class="mt-[.1rem]">
							<CaretRight />
						</span>
					</Button>
				{/if}
			</Card.Footer>
		</Card.Root>
	</div>
</Tabs.Root>
