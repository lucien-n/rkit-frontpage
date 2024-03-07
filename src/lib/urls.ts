export const urls = {
	home: '/',
	signin: '/signin',
	signout: '/signout'
};

export const actions = {
	setProject: '/actions/set-project'
} as const;

type Actions = typeof actions;

type ActionParams<T extends keyof Actions> = Actions[T] extends `${string}[${infer Param}]`
	? Record<Param, string>
	: undefined;

export const getAction = <T extends keyof Actions>(action: T, params?: ActionParams<T>): string => {
	let url: Actions[T] = actions[action]; // Declare 'url' with correct type
	if (params !== undefined) {
		Object.entries(params).forEach(([key, value]) => {
			url = url.replace(`[${key}]`, value) as Actions[T]; // Cast 'url' back to its original type after modification
		});
	}
	return url;
};
