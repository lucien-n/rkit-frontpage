export class InvalidCredentialsError extends Error {
	name = 'InvalidCredentialsError';
	status = 401;

	constructor(message: string) {
		super(message);
	}
}
