import { json, type RequestHandler } from '@sveltejs/kit';

const mockRepos = [{ name: 'lepticoin' }, { name: 'shortener' }, { name: 'leptitcoin v2' }];

export const GET: RequestHandler = async (event) => {
	const { repo } = event.params;

	const repositories = mockRepos.filter(({ name }) => new RegExp(`${repo || ''}`, 'i').test(name));

	return json(repositories);
};
