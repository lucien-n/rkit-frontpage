import { urls } from '$lib/utils/urls';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		await event.locals.remauth.signout();

		redirect(302, urls.home);
	}
};
