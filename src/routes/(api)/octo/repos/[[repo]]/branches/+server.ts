import { octokit, owner } from '$lib/server/octokit';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const { repo } = event.params;
	if (!repo) return error(404);

	const { data } = await octokit.request('GET /repos/{owner}/{repo}/branches', {
		owner,
		repo
	});
	const branches = data.map(({ name }) => name);

	return json(branches);
};
