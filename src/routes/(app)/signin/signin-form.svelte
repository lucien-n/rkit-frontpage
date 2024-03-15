<script lang="ts">
	import { signinSchema, type SigninSchema } from '$shared/modules/auth/schemas/signin.schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import { Button } from '$shadcn/button';
	import { EyeOpen, EyeClosed } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<SigninSchema>>;

	const form = superForm(data, {
		validators: zodClient(signinSchema),
		onError: ({ result }) => toast.error(result.error.message)
	});

	const { form: formData, enhance, submitting } = form;

	let showPassword = false;

	const toggleShowPassword = () => (showPassword = !showPassword);
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} type="text" autocomplete="username" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<div class="flex">
				<Input
					{...attrs}
					bind:value={$formData.password}
					type={showPassword ? 'text' : 'password'}
					autocomplete="current-password"
					class="rounded-r-none border-r-0"
				/>
				<Button
					variant="outline"
					class="rounded-l-none border-l-0 p-3"
					on:click={toggleShowPassword}
				>
					{#if showPassword}
						<EyeOpen />
					{:else}
						<EyeClosed />
					{/if}
				</Button>
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<br />
	<Form.Button class="w-full">{$submitting ? 'Signing In...' : 'Sign In'}</Form.Button>
</form>
