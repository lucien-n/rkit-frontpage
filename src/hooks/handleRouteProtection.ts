import { urls } from '$lib/urls';
import { redirect, type Handle } from '@sveltejs/kit';

export const handleRouteProtection: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin') && !(await event.locals.remauth.getSession())) {
		redirect(307, urls.home);
	}

	return resolve(event);
};
