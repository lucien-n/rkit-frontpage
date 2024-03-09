import { octokit, owner } from '$lib/server/octokit';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const { repo } = event.params;

	const { data } = await octokit.request('GET /search/repositories', {
		q: `owner:${owner} repo:${repo}`,
		sort: 'updated',
		order: 'desc',
		per_page: 10
	});
	const repositories = data.items
		.map(({ name }) => name)
		.filter((name) => new RegExp(`${repo || ''}`, 'i').test(name));

	return json(repositories);
};
