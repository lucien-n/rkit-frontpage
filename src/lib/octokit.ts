import { GITHUB_TOKEN } from '$env/static/private';
import { Octokit } from 'octokit';

export const octokit = new Octokit({
	auth: GITHUB_TOKEN
});

const owner = 'lucien-n';

export const getRepos = async (search?: string) => {
	return [{ name: 'lepticoin' }, { name: 'shortener' }, { name: 'leptitcoin v2' }].find(
		({ name }) => new RegExp(`${search || ''}`, 'i').test(name)
	);
};

export const getRepoBranches = async (repo: string) => {
	const res = await octokit.request('GET /repos/{owner}/{repo}/branches', {
		owner,
		repo
	});
	return res;
};
