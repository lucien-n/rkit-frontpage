<script lang="ts">
	import { getBranches, getRepositories } from '$lib/utils/github';
	import * as Form from '$shadcn/form';
	import type { SetProjectInput } from '$shared/modules/projects/schemas/set-project.schema';
	import Combobox from '$ui/combobox/combobox.svelte';
	import type { SelectOption } from '$ui/combobox/types';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { SuperForm } from 'sveltekit-superforms';

	export let form: SuperForm<SetProjectInput>;
	export let formData: Writable<SetProjectInput>;

	let repositories: string[] = [];
	let branches: string[] = [];

	onMount(async () => {
		repositories = await getRepositories();
	});

	const getSelectOptions = (items: string[]): SelectOption[] =>
		items.map((repo) => ({ label: repo, value: repo }));

	const now = () => new Date().getTime();

	const searchCooldown = 250;
	let lastSearchAt = now();
</script>

<Form.Field {form} name="repo" class="flex flex-col">
	<Combobox
		label="Repository"
		bind:value={$formData.repo}
		items={getSelectOptions(repositories)}
		empty="No repositories found"
		searchPlaceholder="Search repositories..."
		placeholder="Select repository"
		onSelectItem={async (repo) => {
			branches = await getBranches(repo);
		}}
		onSearch={async (search) => {
			if (now() - lastSearchAt < searchCooldown) return;
			lastSearchAt = now();
			repositories = await getRepositories(search);
		}}
	/>
	<Form.FieldErrors />
</Form.Field>
<br />
<Form.Field {form} name="branch" class="flex flex-col">
	<Combobox
		label="Branches"
		bind:value={$formData.branch}
		items={getSelectOptions(branches)}
		empty="No branches found."
		searchPlaceholder="Search branches..."
		placeholder="Select branch"
	/>
	<Form.FieldErrors />
</Form.Field>
