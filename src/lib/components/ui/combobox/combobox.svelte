<script lang="ts">
	import * as Command from '$shadcn/command';
	import * as Popover from '$shadcn/popover';
	import { cn } from '$lib/shadcn/utils';
	import { buttonVariants } from '$shadcn/button';
	import { tick } from 'svelte';
	import * as Form from '$shadcn/form';
	import type { SelectOption } from './types';
	import { CaretSort, Check } from 'radix-icons-svelte';

	export let items: SelectOption[];
	export let value: string;
	export let open: boolean = false;

	export let label: string = 'Items';
	export let empty: string = 'Not items found';
	export let placeholder: string = 'Select item';
	export let searchPlaceholder: string = 'Search...';

	export let onSelectItem: (item: string) => void = () => ({});

	const closeAndFocusTrigger = (triggerId: string) => {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	};

	const handleSelect = (item: string, ids: { content: string; trigger: string }) => {
		closeAndFocusTrigger(ids.trigger);
		value = item;
		onSelectItem(item);
	};
</script>

<Popover.Root bind:open let:ids>
	<Form.Control let:attrs>
		<Form.Label>{label}</Form.Label>
		<Popover.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'w-[400px] justify-between',
				!value && 'text-muted-foreground'
			)}
			role="combobox"
			{...attrs}
		>
			{items.find((item) => item.value === value)?.label ?? placeholder}
			<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Popover.Trigger>
		<input hidden {value} name={attrs.name} />
	</Form.Control>
	<Popover.Content class="w-[400px] p-0">
		<Command.Root>
			<Command.Input autofocus placeholder={searchPlaceholder} class="h-9" />
			<Command.Empty>{empty}</Command.Empty>
			<Command.Group>
				{#each items as item}
					<Command.Item value={item.value} onSelect={() => handleSelect(item.value, ids)}>
						{item.label}
						<Check class={cn('ml-auto h-4 w-4', item.value !== value && 'text-transparent')} />
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
