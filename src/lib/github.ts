export const getRepositories = async (search?: string) => {
	try {
		const res = await fetch(`/octo/repos/${search ?? ''}`);
		const data = await res.json();
		console.log(data);
		return data;
	} catch (e) {
		return [];
	}
};

export const getBranches = async (repo: string) => {
	return [{ name: 'main' }, { name: 'dev' }, { name: 'feat/auth' }];
};
