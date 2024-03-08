import { protectedRoutes, urls } from '$lib/utils/urls';
import { redirect, type Handle } from '@sveltejs/kit';

export const handleRouteProtection: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	for (const route of protectedRoutes.requireAuth) {
		if (pathname.startsWith(route)) {
			const session = await event.locals.remauth.getSession();
			if (!session) redirect(401, urls.home);
		}
	}

	return resolve(event);
};
