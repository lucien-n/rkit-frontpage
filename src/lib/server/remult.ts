import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { controllers, entities } from '$shared';

export const _api = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: POSTGRES_URL }),
	entities,
	controllers,
	admin: true,
	getUser: async (event) => {
		const session = await event.locals.remauth.getSession();

		if (session) {
			return {
				id: 'admin',
				name: session.name
			};
		}

		return undefined;
	}
});
