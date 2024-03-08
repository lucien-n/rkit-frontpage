import { octokit, owner } from '$lib/server/octokit';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const { repo } = event.params;

	const { data } = await octokit.request('GET /users/{username}/repos', {
		username: owner,
		per_page: 10
	});
	const repositories = data
		.map(({ name }) => name)
		.filter((name) => new RegExp(`${repo || ''}`, 'i').test(name));

	return json(repositories);
};
