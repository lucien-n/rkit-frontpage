<script lang="ts">
	import type { PageData } from './$types';
	import SigninForm from './signin-form.svelte';
	import { Card } from '$shadcn/card';

	export let data: PageData;
</script>

<div class="flex h-full w-full items-center justify-center">
	<Card class="px-6 py-4">
		<SigninForm data={data.form} />
	</Card>
</div>
