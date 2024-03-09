<script lang="ts">
	import { getBranches, getRepositories } from '$lib/utils/github';
	import { getSelectOptions } from '$lib/utils/helpers';
	import * as Form from '$shadcn/form';
	import type { SetProjectInput } from '$shared/modules/projects/schemas/set-project.schema';
	import Combobox from '$ui/combobox/combobox.svelte';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { SuperForm } from 'sveltekit-superforms';

	export let form: SuperForm<SetProjectInput>;
	export let formData: Writable<SetProjectInput>;

	let repos: string[] = [];
	let branches: string[] = [];

	onMount(async () => {
		repos = await getRepositories();
		if ($formData.repo) {
			branches = await getBranches($formData.repo);
		}
	});

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
			repos = await getRepositories(searchRepo);
			searchingRepo = false;
		}, searchRepoCooldown);
	};
</script>

<Form.Field {form} name="repo" class="flex flex-col">
	<Combobox
		label="Repository"
		bind:value={$formData.repo}
		items={getSelectOptions(repos)}
		empty={searchingRepo ? 'Fetching repositories...' : 'No repositories found'}
		searchPlaceholder="Search repositories..."
		placeholder="Select repository"
		onSelectItem={async (repo) => {
			branches = await getBranches(repo);
		}}
		onSearch={handleRepositorySearch}
	/>
	<Form.FieldErrors />
</Form.Field>
<br />
<Form.Field {form} name="branch" class="flex flex-col">
	<Combobox
		label="Branch"
		bind:value={$formData.branch}
		items={getSelectOptions(branches ?? [])}
		empty="No branches found."
		searchPlaceholder="Search branches..."
		placeholder="Select branch"
	/>
	<Form.FieldErrors />
</Form.Field>
