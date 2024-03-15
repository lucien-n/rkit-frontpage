import { ADMIN_PASSWORD, ADMIN_USERNAME, JWT_TOKEN } from '$env/static/private';
import { InvalidCredentialsError } from '$shared/helpers/errors/invalid-credentials';
import { parseZSchema } from '$shared/helpers/zod';
import jwt from 'jsonwebtoken';
import { BackendMethod, Controller, remult } from 'remult';
import { signinSchema, type SigninInput } from './schemas/signin.schema';
import { Session } from './session.entity';

@Controller('AuthController')
export class AuthController {
	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async signin(inputs: SigninInput): Promise<Session> {
		const { name, password } = parseZSchema(inputs, signinSchema);

		const validName = ADMIN_USERNAME && ADMIN_USERNAME === name;
		if (!validName) {
			throw new InvalidCredentialsError();
		}

		const validPassword = ADMIN_PASSWORD && ADMIN_PASSWORD === password;
		if (!validPassword) {
			throw new InvalidCredentialsError();
		}

		return AuthController.createSession(name);
	}

	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async signout(sessionId: string) {
		return remult.repo(Session).delete(sessionId);
	}

	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async getSession(id: string): Promise<Session | null> {
		const user = remult.user;

		let session = await remult.repo(Session).findFirst({ id }, { include: { user: true } });
		if (!session) {
			if (user?.name) session = await AuthController.createSession(user.name);
			else return null;
		}

		const isValid = session?.token && this.verifyToken(session.token);
		if (!isValid) {
			await remult.repo(Session).delete(session.id);

			if (!user?.name) return null;
			session = await AuthController.createSession(user.name);
		}

		return remult.repo(Session).toJson(session);
	}

	@BackendMethod({ apiPrefix: 'auth', allowed: false })
	static async createSession(name: string): Promise<Session> {
		const token = this.generateToken(name);
		const session = await remult.repo(Session).insert({ name, token });

		for await (const userSession of remult.repo(Session).query({ where: { name } }))
			if (userSession.id !== session.id) await remult.repo(Session).delete(userSession.id);

		return remult.repo(Session).toJson(session);
	}

	private static generateToken(name: string) {
		const payload = {
			name
		};

		return jwt.sign(payload, JWT_TOKEN, {
			expiresIn: '1h'
		});
	}

	private static verifyToken(token: string): boolean {
		try {
			jwt.verify(token, JWT_TOKEN);
			return true;
		} catch (error) {
			return false;
		}
	}
}
