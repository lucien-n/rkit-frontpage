import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signinSchema } from '$shared/modules/auth/schemas/signin.schema';
import { fail, redirect } from '@sveltejs/kit';
import { urls } from '$lib/urls';

export const load: PageServerLoad = async ({ locals }) => {
	if (await locals.remauth.getSession()) redirect(303, urls.home);

	return {
		form: await superValidate(zod(signinSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signinSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, password } = form.data;

		await event.locals.remauth.signin({ name, password });

		return {
			form
		};
	}
};
