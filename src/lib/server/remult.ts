import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { controllers, entities } from '$shared';
import { Project } from '$shared/modules/projects/project.entity';
import data from './data.json';

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
	},
	initApi: async (remult) => {
		if ((await remult.repo(Project).find()).length < 1) {
			for (const project of data.projects) {
				await remult.repo(Project).insert(project);
			}
		}
	}
});
