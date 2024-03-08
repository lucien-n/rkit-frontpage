<script lang="ts">
	import { getBranches, getRepositories } from '$lib/github';
	import { cn } from '$lib/shadcn/utils';
	import { buttonVariants } from '$shadcn/button';
	import * as Command from '$shadcn/command';
	import * as Form from '$shadcn/form';
	import * as Popover from '$shadcn/popover';
	import type { SetProjectInput } from '$shared/modules/projects/schemas/set-project.schema';
	import { CaretSort, Check } from 'radix-icons-svelte';
	import { onMount, tick } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { SuperForm } from 'sveltekit-superforms';

	export let form: SuperForm<SetProjectInput>;
	export let formData: Writable<SetProjectInput>;

	let repositories: string[] = [];
	let branches: string[] = [];

	onMount(async () => {
		repositories = await getRepositories();
	});

	let openRepositories = false;
	let openBranches = false;

	function closeAndFocusTrigger(triggerId: string) {
		openRepositories = false;
		openBranches = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const handleSelectRepository = async (
		repo: string,
		ids: { content: string; trigger: string }
	) => {
		$formData.repo = repo;
		closeAndFocusTrigger(ids.trigger);

		branches = await getBranches(repo);
	};

	const handleSelectBranch = (branch: string, ids: { content: string; trigger: string }) => {
		$formData.branch = branch;
		closeAndFocusTrigger(ids.trigger);
	};
</script>

<Form.Field {form} name="repo" class="flex flex-col">
	<Popover.Root bind:open={openRepositories} let:ids>
		<Form.Control let:attrs>
			<Form.Label>Repository</Form.Label>
			<Popover.Trigger
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'w-[400px] justify-between',
					!$formData.repo && 'text-muted-foreground'
				)}
				role="combobox"
				{...attrs}
			>
				{repositories.find((name) => name === $formData.repo) ?? 'Select repository'}
				<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Popover.Trigger>
			<input hidden value={$formData.repo} name={attrs.name} />
		</Form.Control>
		<Popover.Content class="w-[400px] p-0">
			<Command.Root>
				<Command.Input autofocus placeholder="Search repositories..." class="h-9" />
				<Command.Empty>No repositories found.</Command.Empty>
				<Command.Group>
					{#each repositories as repo}
						<Command.Item value={repo} onSelect={() => handleSelectRepository(repo, ids)}>
							{repo}
							<Check class={cn('ml-auto h-4 w-4', repo !== $formData.repo && 'text-transparent')} />
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<Form.FieldErrors />
</Form.Field>
<br />
<Form.Field {form} name="branch" class="flex flex-col">
	<Popover.Root bind:open={openBranches} let:ids>
		<Form.Control let:attrs>
			<Form.Label>Branches</Form.Label>
			<Popover.Trigger
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'w-[400px] justify-between',
					!$formData.branch && 'text-muted-foreground'
				)}
				role="combobox"
				{...attrs}
			>
				{branches.find((branch) => branch === $formData.branch) ?? 'Select branch'}
				<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Popover.Trigger>
			<input hidden value={$formData.branch} name={attrs.name} />
		</Form.Control>
		<Popover.Content class="w-[400px] p-0">
			<Command.Root>
				<Command.Input autofocus placeholder="Search branch..." class="h-9" />
				<Command.Empty>No branch found.</Command.Empty>
				<Command.Group>
					{#each branches as branch}
						<Command.Item value={branch} onSelect={() => handleSelectBranch(branch, ids)}>
							{branch}
							<Check
								class={cn('ml-auto h-4 w-4', branch !== $formData.branch && 'text-transparent')}
							/>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<Form.FieldErrors />
</Form.Field>
