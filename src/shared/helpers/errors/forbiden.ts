export class ForbiddenError extends Error {
	name = 'ForbiddenError';
	status = 403;

	constructor(message?: string) {
		super(message);
	}
}
