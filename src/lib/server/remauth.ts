import { AuthController } from '$shared/modules/auth/auth.controller';
import type { SigninInput } from '$shared/modules/auth/schemas/signin.schema';
import type { Session } from '$shared/modules/auth/session.entity';
import type { RequestEvent } from '@sveltejs/kit';

type RemauthServerClientOptions = {
	session: {
		key: string;
		maxAge: number;
	};
};

const defaultServerClientOptions: RemauthServerClientOptions = {
	session: {
		key: 'session',
		maxAge: 24
	}
};

export const createRemauthServerClient = (
	event: RequestEvent,
	options: RemauthServerClientOptions = defaultServerClientOptions
) => {
	const setSessionCookie = (value: string) => {
		event.cookies.set(options.session.key, value, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: options.session.maxAge * 3600
		});
	};

	const deleteSessionCookie = () => {
		event.cookies.delete(options.session.key, { path: '/' });
	};

	const getSessionCookie = () => {
		return event.cookies.get(options.session.key);
	};

	const getSession = async (): Promise<Session | null> => {
		const sessionId = getSessionCookie();
		if (!sessionId) {
			return null;
		}

		return AuthController.getSession(sessionId);
	};

	const signin = async (signinCredentials: SigninInput): Promise<Session> => {
		const session = await AuthController.signin(signinCredentials);

		if (session) {
			setSessionCookie(session.id);
		}

		return session;
	};

	const signout = async (): Promise<void> => {
		const session = await getSession();

		if (session) {
			await AuthController.signout(session.id);
			deleteSessionCookie();
		}
	};

	return {
		getSession,
		signin,
		signout
	};
};

export type RemauthServerClient = ReturnType<typeof createRemauthServerClient>;
