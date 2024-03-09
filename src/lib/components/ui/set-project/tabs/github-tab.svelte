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

	let getRepos: Promise<string[]> | [] = [];
	let getBranchs: Promise<string[]> | [] = [];

	onMount(async () => {
		getRepos = getRepositories();
		if ($formData.repo) {
			getBranchs = getBranches($formData.repo);
		}
	});

	const getSelectOptions = (items: string[]): SelectOption[] =>
		items.map((repo) => ({ label: repo, value: repo }));

	const searchRepoCooldown: number = 200;
	let searchRepo: string = '';
	let searchRepoTimeout: ReturnType<typeof setTimeout> | null = null;
	let searchingRepo: boolean = false;

	const handleRepositorySearch = (search: string) => {
		if (searchRepo === search) return;
		searchRepo = search;

		if (searchRepoTimeout) {
			clearTimeout(searchRepoTimeout);
		}
		searchingRepo = true;

		searchRepoTimeout = setTimeout(async () => {
			getRepos = getRepositories(searchRepo);
			searchingRepo = false;
		}, searchRepoCooldown);
	};
</script>

<Form.Field {form} name="repo" class="flex flex-col">
	{#await getRepos}
		<p>Fetching repositories</p>
	{:then repos}
		<Combobox
			label="Repository"
			bind:value={$formData.repo}
			items={getSelectOptions(repos)}
			empty={searchingRepo ? 'Loading repositories...' : 'No repositories found'}
			searchPlaceholder="Search repositories..."
			placeholder="Select repository"
			onSelectItem={async (repo) => {
				getBranchs = getBranches(repo);
			}}
			onSearch={handleRepositorySearch}
		/>
	{/await}
	<Form.FieldErrors />
</Form.Field>
<br />
<Form.Field {form} name="branch" class="flex flex-col">
	{#await getBranchs}
		<p>Fetching repositories</p>
	{:then branches}
		<Combobox
			label="Branch"
			bind:value={$formData.branch}
			items={getSelectOptions(branches)}
			empty="No branches found."
			searchPlaceholder="Search branches..."
			placeholder="Select branch"
		/>
	{/await}
	<Form.FieldErrors />
</Form.Field>
