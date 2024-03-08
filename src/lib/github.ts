export const getRepositories = async (search?: string): Promise<string[]> => {
	try {
		const res = await fetch(`/octo/repos/${search ?? ''}`);
		const data = await res.json();
		return data;
	} catch (e) {
		return [];
	}
};

export const getBranches = async (repo: string): Promise<string[]> => {
	try {
		const res = await fetch(`/octo/repos/${repo}/branches`);
		const data = await res.json();
		return data;
	} catch (e) {
		return [];
	}
};
